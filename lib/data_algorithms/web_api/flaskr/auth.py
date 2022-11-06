from flask import (Blueprint, flash, g, redirect, render_template, request, session, url_for)
from flask_jwt import jwt_required, current_identity
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import get_db 
import functools
import hmac

# import numpy as np
# import pandas as pd
# import matplotlib
import cv2 as cv
import tensorflow as tf
# from tensorflow import keras, cast
# import matplotlib.pyplot as plt
import math

bathroom = tf.keras.models.load_model('./models/bathroom.h5')
diningroom = tf.keras.models.load_model('./models/diningroom.h5')
bedroom = tf.keras.models.load_model('./models/bedroom.h5')
livingroom = tf.keras.models.load_model('./models/livingroom.h5')
kitchen = tf.keras.models.load_model('./models/kitchen.h5')
IMG_SIZE = 224

class User(object):
    def __init__(self, id, username):
        self.id = id
        self.username = username

    def __str__(self):
        return f"User(id='{self.id}')"

bp = Blueprint('auth', __name__, url_prefix='/user')

def authenticate(username, password):
    db = get_db()
    error = None
    if not username:
        error = 'Username is required.'
    elif not password:
        error = 'Password is required.'
    if error is None:
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()
        print("🚀 ~ file: auth.py ~ line 29 ~ user", user)
        if user is not None:
            match = check_password_hash(user['password'], password)
            if user and match:
                return User(user['id'], user['username'])
    return {
        'message': error
    }

def identity(payload):
    user_id = payload['identity']
    db = get_db()
    user = db.execute(
                'SELECT * FROM user WHERE id = ?', (user_id,)
            ).fetchone() or None
    if user is None:
        return {
            'message': 'No user'
        }
    return {
        'username': user['username'],
        'id': user['id']
    }

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            try:
                db.execute(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    (username, generate_password_hash(password)),
                )
                db.commit()
                return {
                    'username': username,
                }
            except db.IntegrityError:
                error = f"User {username} is already registered."
                return {
                    'message': f'Auth error = {error}'
                }
    return {
        'message': f'auth error{error}'
        }

@bp.route('/protected', methods=('GET', 'POST'))
@jwt_required()
def protected():
    print("🚀 ~ file: auth.py ~ line 104 ~ protected")
    
    return {'message': current_identity}
