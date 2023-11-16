import os
import secrets
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


@app.route('/blogs/new-blog', methods=['POST', 'GET'])
def add_blog():
    """The Add New Blog Route"""
    if request.method == 'POST':
        try:
            data = request.get_json()
            blogTitle = data.get('blogTitle')
            blogBody = data.get('blogBody')

            new_blog = {
                'title': blogTitle,
                'body': blogBody
            }

            my_blog.insert_one(new_blog)
            flash('Blog uploaded to the database', 'success')
            return redirect(url_for('get_blogs'))
        except Exception as e:
            print(f"Error adding blog: {e}")
            flash(f"Error adding blog: {e}", 'danger')
            return jsonify({'error': f"Error: {e}"}), 500

    return render_template('new-blog.html')




@app.route('/', methods=['GET'])
@app.route('/blogs/', methods=['GET'])
def get_blogs():
    """The Get Blogs Route"""
    try:
        blogs = list(my_blog.find())

        for blog in blogs:
            print(blog)
    except Exception as e:
        print(f"Error retrieving blogs: {e}")
    return render_template('blogs.html', blogs=blogs)


@app.route('/support')
def support_page():
    """The support route"""
    return render_template('support.html')



if __name__ == "__main__":
    app.run(debug=True)