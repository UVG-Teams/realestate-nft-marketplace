import os
from flask_jwt import JWT, jwt_required, current_identity
from flaskr.db import get_db
from flask import Flask
from werkzeug.security import check_password_hash, generate_password_hash

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # @jwt_required()
    @app.route('/protected')
    def protected():
        return {'message': f'{current_identity}'}

    from . import db
    db.init_app(app)

    from . import auth
    jwt = JWT(app, auth.authenticate, auth.identity)
    app.register_blueprint(auth.bp)

    return app
