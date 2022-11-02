from flask import (Blueprint, flash, g, redirect, render_template, request, session, url_for)
from flask_jwt import jwt_required, current_identity
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import get_db 
import functools
import hmac

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
        match = check_password_hash(user['password'], password)
        if user and match:
            print("🚀 ~ file: auth.py ~ line 25 ~ user", user)
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

        print("🚀 ~ file: auth.py ~ line 31 ~ username", username, password)
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
#        flash(error)
    return {
        'message': f'auth error{error}'
        }

@bp.route('/protected', methods=('GET', 'POST'))
@jwt_required()
def protected():
    return {'message': current_identity}
