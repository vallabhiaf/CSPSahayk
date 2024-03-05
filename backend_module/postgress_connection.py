#!/usr/bin/env python

import psycopg2
from flask import Flask, request, jsonify
import psycopg2
import numpy as np
from flask_cors import CORS
import requests

# Database connection parameters
db_params = {
  "database": "consultantsahayak",
  "user": "admin",
  "password": "admin",
  "host": "localhost",
  "port": "5432"
}

app = Flask(__name__)
CORS(app)

# @app.route('/insert_product_data', methods=['POST'])
# def insert_data():
#   try:
#     # Get data from the request
#     data = request.get_json()
#     product_name = data['product_name']
#     detailed_summary = data['detailed_summary']
#
#     # Establish a database connection
#     connection = psycopg2.connect(**db_params)
#
#     # Create a cursor
#     cursor = connection.cursor()
#
#     # Insert data into the database
#     insert_data_query = '''
#                  INSERT INTO SAP_PRODUCTS(product_name, detailed_summary)
#                     VALUES(%s,%s) RETURNING product_id;
#                     '''
#     cursor.execute(insert_data_query, (product_name, detailed_summary))
#     inserted_id = cursor.fetchone()[0]
#     connection.commit()
#
#
#
#     # Close the cursor and connection
#     cursor.close()
#     connection.close()
#
#     return jsonify({"message": "Data inserted successfully", "inserted_id": inserted_id})
#
#   except (psycopg2.Error, KeyError) as e:
#     return jsonify({"error": str(e)}), 400

# @app.route('/insert_vector_data', methods=['POST'])
# def insert_vector_format():
#   try:
#     # Get data from the request
#     data = request.get_json()
#     detailed_summary = data['detailed_summary']
#     vector_representation = data['vector_representation']
#
#     # Get data from the request
#     # Establish a database connection
#     connection = psycopg2.connect(**db_params)
#
#     # Create a cursor
#     cursor = connection.cursor()
#
#     # Insert data into the database
#     insert_data_query = '''
#                  INSERT INTO VECTOR_DB1(detailed_summary,vector_representation)
#                     VALUES(%s,%s) RETURNING vector_id;
#                     '''
#     cursor.execute(insert_data_query, (detailed_summary,vector_representation))
#     inserted_id = cursor.fetchone()[0]
#     connection.commit()
#
#
#
#     # Close the cursor and connection
#     cursor.close()
#     connection.close()
#
#     return jsonify({"message": "Data inserted successfully", "inserted_id": inserted_id})
#
#   except (psycopg2.Error, KeyError) as e:
#     return jsonify({"error": str(e)}), 400



@app.route('/create_product_table', methods=['POST'])
def create_product_table():
  try:
    connection = psycopg2.connect(**db_params)
    # Create a cursor
    cursor = connection.cursor()

    # Check if the table exists
    cursor.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s);", ("sap_products",))
    table_exists = cursor.fetchone()[0]

    if not table_exists:
      # Create the table dynamically
      create_table_query = '''
            CREATE TABLE SAP_PRODUCTS (
                product_id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                detailed_summary TEXT NOT NULL,
                tags VARCHAR[],
                learning_link_1 VARCHAR(255),
                learning_link_2 VARCHAR(255)
            );
            '''
      cursor.execute(create_table_query)
      connection.commit()
      return jsonify({"message": "Table created successfully"})
    return jsonify({"message": "Table already exisits"})


  except psycopg2.Error as e:
    # Log the error and handle it appropriately
    raise e


@app.route('/create_vector_table', methods=['POST'])
def create_vector_table():
  try:
    connection = psycopg2.connect(**db_params)
    # Create a cursor
    cursor = connection.cursor()

    # Check if the table exists
    cursor.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s);", ("vector_db1",))
    table_exists = cursor.fetchone()[0]

    if not table_exists:
      # Create the table dynamically
      create_table_query = '''
            CREATE TABLE VECTOR_DB1 (
                vector_id SERIAL PRIMARY KEY,
                detailed_summary TEXT NOT NULL,
                vector_representation FLOAT[]
            );
            '''
      cursor.execute(create_table_query)
      connection.commit()
      return jsonify({"message": "Table created successfully"})
    return jsonify({"message": "Table already exisits"})


  except psycopg2.Error as e:
    # Log the error and handle it appropriately
    raise e

@app.route('/get_similarity', methods=['POST'])
def get_similarity():
  try:
    # Get the input vector from the request JSON data
    input_vector = request.json.get("input_vector")

    connection = psycopg2.connect(**db_params)
    # Create a cursor
    cursor = connection.cursor()

    # Load the vector_representation data from the database
    cursor.execute("SELECT detailed_summary, vector_representation FROM VECTOR_DB1")
    rows = cursor.fetchall()

    similarity_list = []

    # Calculate the dot product for each row in the result set
    for row in rows:
      vector_representation = row[1]  # Assuming the vector_representation is in the second column
      dot_product = np.dot(input_vector, vector_representation)
      vec_norm = np.linalg.norm(input_vector)
      context_matrix = np.linalg.norm(vector_representation, axis=0)
      similarities = dot_product/(vec_norm*context_matrix);
      cosine_similarity = np.dot(input_vector, vector_representation) / (np.linalg.norm(input_vector) * np.linalg.norm(vector_representation))

      # Append the dot product along with other data from the row to the list
      similarity_list.append({
        "detailed_summary": row[0],  # Assuming the detailed_summary is in the first column
        "dot_product": cosine_similarity
      })
      similarity_threshold = 0.78
      filtered_similarity_list = [entry for entry in similarity_list if entry["dot_product"] > similarity_threshold]


      cursor.close()
      connection.close()

    # Convert the dot products and data to a JSON response
    response_data = {
      "similarity_list": filtered_similarity_list
    }

    return jsonify(response_data)

  except psycopg2.Error as e:
    # Log the error and handle it appropriately
    raise e

def basic_cleaning(text_input):

  cleaned_string = text_input.replace('\r', '').replace('\n', '')

  return cleaned_string







def get_embeddings(text_input):

  # Define the API endpoint URL

  api_url = "https://azure-openai-serv-i057149.cfapps.eu12.hana.ondemand.com/api/v1/embeddings"



  # Define the OAuth 2.0 bearer token (replace 'YOUR_BEARER_TOKEN' with your actual token)

  bearer_token = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktMTc2NTgyOTIwMiIsInR5cCI6IkpXVCIsImppZCI6ICI1M2FpT0NmTml5ZTlEV0ppUzlmVWhMK0tZTGhqR1NKK0lNejRCT2hRL0x3PSJ9.eyJqdGkiOiI4MTgwMTc4ODBhMjI0MjU0YmJmNzc0OGZiYTIzNDk4ZSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiI2OTNjZTAxYy0wODk5LTRlZjgtYTAyOS0xYjE4MjFiYTczNWUiLCJ6ZG4iOiJjaWFzLWRldmVsb3BtZW50Iiwic2VydmljZWluc3RhbmNlaWQiOiJlODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEifSwic3ViIjoic2ItZTg2ZDFkZjctMTMxZC00NTU4LWJjMGMtNmFjYWE1ZjMyYjMxIWIxNjk5fGF6dXJlLW9wZW5haS1zZXJ2aWNlLWkwNTcxNDkteHMhYjcwMjMwIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJjaWQiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJhenAiOiJzYi1lODZkMWRmNy0xMzFkLTQ1NTgtYmMwYy02YWNhYTVmMzJiMzEhYjE2OTl8YXp1cmUtb3BlbmFpLXNlcnZpY2UtaTA1NzE0OS14cyFiNzAyMzAiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImE2YjY2Y2E5IiwiaWF0IjoxNjk3MDg1ODk0LCJleHAiOjE2OTcxMjkwOTQsImlzcyI6Imh0dHBzOi8vY2lhcy1kZXZlbG9wbWVudC5hdXRoZW50aWNhdGlvbi5ldTEyLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMWM2MmM2YWYtOGQxZS00NTBhLTk1MTQtYThlNzMzZDYwNTliIiwiYXVkIjpbInVhYSIsInNiLWU4NmQxZGY3LTEzMWQtNDU1OC1iYzBjLTZhY2FhNWYzMmIzMSFiMTY5OXxhenVyZS1vcGVuYWktc2VydmljZS1pMDU3MTQ5LXhzIWI3MDIzMCJdfQ.h75fZBLKQxnP1ydps8nPgyUj8zeJ86KIxZraWT2y6ftcpGDf0m6z1mWfz8xT3i3btmqfRRPRmiXy5vhp6LYjNBDysVSGx0lmVqiM5gwkI8OLJBaXmTgSQQ5oyWT0wkoJYzFwU6n4cWdEXk7e7BK_ALm-xlsnCQF2peulAGKLTdW8_eixqBr3FjXUPUsw3au3vwApxnGXwjZBuKkTvhtvyQ83qgYGP1yh3xynwWSZUUkBCDxeeqJBOAf7xDAJW4TW5W5kL2fUVIGUVhgTNpBd_l5RnabOnMGZ0yDcP04KBluAZEDZLbtJ3vbH2-ub4kuWWbjH7MHRrT0Jz6RttOBtxQ'

  # Define the data to be sent in the POST request (you can modify this as needed)

  data = {

    "deployment_id": "text-embedding-ada-002-v2",

    "input": f"{text_input}"

  }



  # Define the headers with the Authorization header

  headers = {

    "Authorization": f"Bearer {bearer_token}",

    "Content-Type": "application/json"  # Specify the content type as JSON

  }



  # Make the POST request with headers

  try:

    response = requests.post(api_url, json=data, headers=headers)



    # Check if the request was successful (HTTP status code 200)

    if response.status_code == 200:

      print("POST request was successful.")

      print("Response JSON:", response.json())

      response_data = response.json()

      if "data" in response_data and response_data["data"]:

        embedding_values = response_data["data"][0].get("embedding", [])

        return embedding_values

      return None



    else:

      print(f"POST request failed with status code {response.status_code}.")

      return None

  except Exception as e:

    print(f"An error occurred: {str(e)}")

    return None



@app.route('/insert_product_data', methods=['POST'])

def insert_product_data():

  try:

    # Get data from the request

    data = request.get_json()

    product_name = data['product_name']

    detailed_summary = data['detailed_summary']









    # Establish a database connection

    connection = psycopg2.connect(**db_params)



    # Create a cursor

    cursor = connection.cursor()



    # Insert data into the database

    insert_data_query = '''

                 INSERT INTO SAP_PRODUCTS(product_name, detailed_summary)

                    VALUES(%s,%s) RETURNING product_id;

                    '''

    cursor.execute(insert_data_query, (product_name, detailed_summary))

    inserted_id = cursor.fetchone()[0]

    connection.commit()







    # Close the cursor and connection

    cursor.close()

    connection.close()

    cleaned_text=basic_cleaning(detailed_summary)

    vector_representation = get_embeddings(cleaned_text)

    insert_vector_format(detailed_summary,vector_representation)



    return jsonify({"message": "Data inserted successfully", "inserted_id": inserted_id})



  except (psycopg2.Error, KeyError) as e:

    return jsonify({"error": str(e)}), 400



# @app.route('/insert_vector_data', methods=['POST'])

def insert_vector_format(detailed_summary,vector_representation):

  try:

    # Get data from the request

    # data = request.get_json()

    # detailed_summary = data['detailed_summary']

    # vector_representation = data['vector_representation']



    # Get data from the request

    # Establish a database connection

    connection = psycopg2.connect(**db_params)



    # Create a cursor

    cursor = connection.cursor()



    # Insert data into the database

    insert_data_query = '''

                 INSERT INTO VECTOR_DB1(detailed_summary,vector_representation)

                    VALUES(%s,%s) RETURNING vector_id;

                    '''

    cursor.execute(insert_data_query, (detailed_summary,vector_representation))

    inserted_id = cursor.fetchone()[0]

    connection.commit()







    # Close the cursor and connection

    cursor.close()

    connection.close()



    return jsonify({"message": "Data inserted successfully", "inserted_id": inserted_id})



  except (psycopg2.Error, KeyError) as e:

    return jsonify({"error": str(e)}), 400





if __name__ == '__main__':
  app.run(debug=True)


