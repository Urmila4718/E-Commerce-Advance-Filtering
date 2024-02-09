import os
from PIL import Image
import pickle
import tensorflow
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import Model
from tqdm import tqdm
# print("TensorFlow version:", tensorflow.__version__)
from tensorflow.keras.layers import GlobalMaxPooling2D,GlobalAveragePooling2D

base_model=ResNet50(weights='imagenet',include_top=False, input_shape=(224,224,3))
base_model.trainable=False

model = Model(inputs=base_model.input, outputs=GlobalAveragePooling2D()(base_model.output))

def extract_feature(img_path, model):
    print("img_path:",img_path)
    img=cv2.imread(img_path)
    img=cv2.resize(img, (224,224))
    img=np.array(img)
    expand_img=np.expand_dims(img, axis=0)
    pre_img=preprocess_input(expand_img)
    result=model.predict(pre_img).flatten()
    normalized=result/norm(result)
    return normalized

filename=[]
feature_list=[]
directory_path = r'C:\Urmila\test\E-Commerce Advance Filtering\public\images'

for file in os.listdir(directory_path):
    print(file)
    filename.append(os.path.join(directory_path,file))

filename[0:5]

for file in tqdm(filename):
    feature_list.append(extract_feature(file,model))

pickle.dump(feature_list,open('featurevector.pkl','wb'))
pickle.dump(filename,open('filenames.pkl','wb'))
app = Flask(__name__)
CORS(app)
feature_list = np.array(pickle.load(open('featurevector.pkl', 'rb')))
filenames = pickle.load(open('filenames.pkl', 'rb'))
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False
model = tensorflow.keras.Sequential([model, GlobalMaxPooling2D()])

# Define a route for file upload and processing
@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']

    if uploaded_file is not None:
        # Save the uploaded file
        try:
            if not os.path.exists('uploads'):
                os.makedirs('uploads')
            file_path = os.path.join('uploads', uploaded_file.filename)
            uploaded_file.save(file_path)

            # Display the file (you can send this information back to the frontend if needed)
            display_image = Image.open(file_path)
            resized_img = display_image.resize((200, 200))

            # Feature extraction
            features = extract_feature(file_path, model)
            # Recommendation
            indices = recommend(features, feature_list)

            recommended_images = [filenames[idx] for idx in indices[0]]
            

            relative_paths = [os.path.relpath(path, r'C:\Urmila\test\E-Commerce Advance Filtering\public') for path in recommended_images]
            print("relative_paths:",relative_paths)
        
            return relative_paths, 200
        except Exception as e:
            error_message = str(e)
            return jsonify({'error': error_message}), 500

    return jsonify({'error': 'No file part'}), 400


def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors=8, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)
    distances, indices = neighbors.kneighbors([features])
    return indices

if __name__ == '__main__':
    app.run(debug=True)