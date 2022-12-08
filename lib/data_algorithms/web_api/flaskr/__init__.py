import os
from flask_jwt import JWT, jwt_required, current_identity
from flaskr.db import get_db
from flask import Flask, request
from werkzeug.security import check_password_hash, generate_password_hash
import tensorflow as tf
from tensorflow import keras, cast
import numpy as np
import cv2 as cv
import xgboost as xgb
from xgboost import XGBRegressor
from sklearn import tree
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, RandomizedSearchCV
import pandas as pd
bedroom_cnn = tf.keras.models.load_model('/Users/marcofuentes/Documents/UVG/megaproyecto/realestate-nft-marketplace/lib/data_algorithms/web_api/flaskr/models/bedroom.h5')
bathroom_cnn = tf.keras.models.load_model('/Users/marcofuentes/Documents/UVG/megaproyecto/realestate-nft-marketplace/lib/data_algorithms/web_api/flaskr/models/bathroom.h5')
dining_cnn = tf.keras.models.load_model('/Users/marcofuentes/Documents/UVG/megaproyecto/realestate-nft-marketplace/lib/data_algorithms/web_api/flaskr/models/dining.h5')
living_cnn = tf.keras.models.load_model('/Users/marcofuentes/Documents/UVG/megaproyecto/realestate-nft-marketplace/lib/data_algorithms/web_api/flaskr/models/livingroom.h5')
kitchen_cnn = tf.keras.models.load_model('/Users/marcofuentes/Documents/UVG/megaproyecto/realestate-nft-marketplace/lib/data_algorithms/web_api/flaskr/models/kitchen.h5')
price_predictor = XGBRegressor()
price_predictor.load_model("/Users/marcofuentes/Documents/UVG/megaproyecto/realestate-nft-marketplace/lib/data_algorithms/web_api/flaskr/models/price.txt")
IMG_SIZE = 224
def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    # if test_config is None:
    app.config.from_pyfile('config.py', silent=True)
    # else:
    #     app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from . import auth
    jwt = JWT(app, auth.authenticate, auth.identity)
    app.register_blueprint(auth.bp)

    @jwt_required()
    @app.route('/protected')
    def protected():
        return {'message': f'{current_identity}'}

    @app.route('/validate_image', methods=['POST'])
    @jwt_required()
    def validate_image():
        IMAGE_CHANNEL = 1
        r = request
        # convert string of image data to uint8
        nparr = np.fromstring(r.data, np.uint8)
        # decode image
        img_array= cv.imdecode(nparr, cv.IMREAD_GRAYSCALE)
        new_array = cv.resize(img_array, (IMG_SIZE, IMG_SIZE))
        processing = new_array.reshape(-1, IMG_SIZE, IMG_SIZE, IMAGE_CHANNEL)
        
        result_bedroom = bedroom_cnn.predict(processing)
        result_bathroom = bathroom_cnn.predict(processing)
        result_dining = dining_cnn.predict(processing)
        result_living = living_cnn.predict(processing)
        result_kitchen = kitchen_cnn.predict(processing)
        print("🚀 ~ file: __init__.py ~ line 62 ~ result_kitchen", result_kitchen)
        return {
            'message': 
            {
                'result_bedroom': f'{result_bedroom[0][0]: .2f}',
                'result_bathroom': f'{result_bathroom[0][0]: .2f}',
                'result_dining': f'{result_dining[0][0]: .2f}',
                'result_living': f'{result_living[0][0]: .2f}',
                'result_kitchen': f'{result_kitchen[0][0]: .2f}',
            }
        }

    @app.route('/predict_price', methods=['POST'])
    @jwt_required()
    def predict_price():
        df_dict = {
            'STORIES': float(request.form['STORIES']),
            'TOTROOMS': float(request.form['TOTROOMS']),
            'BEDROOMS': float(request.form['BEDROOMS']),
            'BATHROOMS': float(request.form['BATHROOMS']),
            'FIREPLACE': float(request.form['FIREPLACE']),
            'DISHWASH': float(request.form['DISHWASH']),
            'HINCP': float(request.form['HINCP']),
            'MORTAMT': float(request.form['MORTAMT']),
            'more_3_bathrooms': float(request.form['more_3_bathrooms']),
            'square_footage_3000_to_3999': float(request.form['square_footage_3000_to_3999']),
            'square_footage_4000 or more': float(request.form['square_footage_4000_or_more']),
            'hot_water_piped_gas': float(request.form['hot_water_piped_gas']),
        }
        dataset = pd.DataFrame(data=df_dict, index=[0])
        print(df_dict)
        prediction = price_predictor.predict([dataset.iloc[0]])
        return {
            'prediction': float(prediction[0]),
            'desvest': float(3546.59),
        }
        pass
    return app
