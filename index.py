from datetime import datetime
import os
import secrets
from bson import ObjectId
from flask import Flask, request, render_template, flash, redirect, url_for, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_URI = os.getenv('DATABASE_URI')
SECRET_KEY = os.getenv('SECRET_KEY')

# print(DATABASE_NAME, DATABASE_URI, SECRET_KEY)
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY

# Initialize the MongoDB client
try:
    client = MongoClient(DATABASE_URI)
    
    # Get the database
    db = client.get_database(DATABASE_NAME)
    
    # Get the 'blogs' collection
    my_blog = db.blogs
    
except Exception as e:
    print(f"MongoDB connection error: {e}")
    raise e


@app.route('/blog/<string:blog_id>', methods=['GET'])
@app.route('/blogs/new-blog', methods=['POST', 'GET'])
def add_blog(blog_id=""):
    """The Add New Blog Route"""
    if request.method == 'POST':
        try:
            data = request.get_json()
            blogTitle = data.get('blogTitle')
            blogBody = data.get('blogBody')

            new_blog = {
                'title': blogTitle,
                'body': blogBody,
                'createdAt': datetime.now()
            }
            my_blog.insert_one(new_blog)
            flash('Blog uploaded to the database', 'success')
            return redirect(url_for('get_blogs_page'))
        except Exception as e:
            print(f"Error adding blog: {e}")
            flash(f"Error adding blog: {e}", 'danger')
            return jsonify({'error': f"Error: {e}"}), 500
        
    blog = {}
    try:
        blog = my_blog.find_one({'_id': ObjectId(blog_id)})
        blog['_id'] = str(blog['_id'])
    except Exception as e:
        print(f"Error retrieving blog: {e}")
    return render_template('new-blog.html', blog=blog)




@app.route('/', methods=['GET'])
def get_blogs_page():
    """The Get Blogs Route"""
    try:
        blogs = list(my_blog.find())

        for blog in blogs:
            print(blog)
    except Exception as e:
        print(f"Error retrieving blogs: {e}")
    return render_template('blogs.html')

@app.route('/blogs', methods=['GET'])
def get_blogs():
    """Get the blogs from the database"""
    try:
        blogsRaw = my_blog.find()
        blogs = []
        for blog in blogsRaw:
            blog['_id'] = str(blog['_id'])
            blogs.append(blog)
        return jsonify(blogs), 200
    except Exception as e:
        print(f"Error retrieving blogs: {e}")
        return jsonify({'error': f"Error: {e}"}), 500
    
@app.route('/blog/<string:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    """Delete a blog from the database"""
    try:
        my_blog.delete_one({'_id': ObjectId(blog_id)})
        return jsonify({'message': 'Blog deleted successfully'}), 200
    except Exception as e:
        print(f"Error deleting blog: {e}")
        return jsonify({'error': f"Error: {e}"}), 500
    
@app.route('/blog/<string:blog_id>', methods=['PUT'])
def update_blog(blog_id):
    """Update a blog in the database"""
    try:
        data = request.get_json()
        blogTitle = data.get('blogTitle')
        blogBody = data.get('blogBody')

        my_blog.update_one({'_id': ObjectId(blog_id)}, {'$set': {'title': blogTitle, 'body': blogBody}})
        return jsonify({'message': 'Blog updated successfully'}), 200
    except Exception as e:
        print(f"Error updating blog: {e}")
        return jsonify({'error': f"Error: {e}"}), 500

@app.route('/support')
def support_page():
    """The support route"""
    return render_template('support.html')

@app.route('/fake-support')
def fake_support_page():
    """The fake-support route"""
    return render_template('fake-support.html')



if __name__ == "__main__":
    app.run(debug=True)