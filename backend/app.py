import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for your React frontend

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
# Use SUPABASE_SERVICE_KEY if present to avoid auth/RLS permission issues
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_KEY", "")).strip()

supabase = None
try:
    if SUPABASE_URL and "your-project-id" not in SUPABASE_URL and SUPABASE_KEY:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Supabase client initialized successfully.")
    else:
        print("WARNING: Please update backend/.env with your actual Supabase URL and Key.")
except Exception as e:
    print(f"WARNING: Failed to initialize Supabase client: {e}")
    print("Please update backend/.env with your actual Supabase credentials.")

# Admin Credentials
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin").strip()
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin").strip()

@app.before_request
def check_supabase():
    # Allow local/status/health checks if needed, but block api routes requiring Supabase
    if supabase is None and request.path.startswith('/api/') and not request.path.endswith('/admin/login'):
        return jsonify({
            "error": "Supabase client not initialized. Please configure backend/.env with valid credentials."
        }), 503

def to_frontend_format(plant):
    return {
        "id": str(plant.get("id")),
        "name": plant.get("name"),
        "scientificName": plant.get("scientific_name", ""),
        "category": plant.get("category") or plant.get("type", "Flowering Plants"),
        "price": float(plant.get("price") or 150),
        "water": plant.get("water", "Twice a week"),
        "sunlight": plant.get("sunlight", "Bright Indirect Light"),
        "size": plant.get("size", "8 inch nursery pot"),
        "isFeatured": bool(plant.get("is_featured", False)),
        "description": plant.get("description", ""),
        "image": plant.get("image_url", "")
    }

# Admin login route
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    try:
        data = request.json or {}
        username = data.get("username", "").strip().lower()
        password = data.get("password", "")
        
        if username == ADMIN_USERNAME.lower() and password == ADMIN_PASSWORD:
            return jsonify({"success": True, "message": "Authentication successful"}), 200
        else:
            return jsonify({"success": False, "error": "Invalid Administrator credentials."}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------------------------------------------------
# CRUD API ROUTES
# -------------------------------------------------------------

# 1. READ: Get all plants
@app.route('/api/plants', methods=['GET'])
def get_plants():
    try:
        response = supabase.table('plants').select('*').order('created_at', desc=True).execute()
        frontend_plants = [to_frontend_format(p) for p in response.data]
        return jsonify(frontend_plants), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. CREATE: Add a new plant
@app.route('/api/plants', methods=['POST'])
def add_plant():
    try:
        data = request.json or {}
        
        # Build payload mapping frontend keys to database columns
        plant_payload = {
            "name": data.get("name"),
            "type": data.get("category", "Flowering Plants"),  # Populate required DB column
            "category": data.get("category"),
            "scientific_name": data.get("scientificName"),
            "price": float(data.get("price", 150)),
            "water": data.get("water"),
            "sunlight": data.get("sunlight"),
            "size": data.get("size"),
            "is_featured": bool(data.get("isFeatured", False)),
            "description": data.get("description"),
            "image_url": data.get("image")
        }

        # Check required fields
        if not plant_payload["name"] or not plant_payload["description"] or not plant_payload["image_url"]:
            return jsonify({"error": "Name, Description, and Image are required fields."}), 400

        response = supabase.table('plants').insert(plant_payload).execute()
        return jsonify(to_frontend_format(response.data[0])), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 3. UPDATE: Modify an existing plant
@app.route('/api/plants/<plant_id>', methods=['PUT'])
def update_plant(plant_id):
    try:
        data = request.json or {}
        
        # Prepare updated values mapped to database schema columns
        update_payload = {
            "name": data.get("name"),
            "type": data.get("category", "Flowering Plants"),  # Populate required DB column
            "category": data.get("category"),
            "scientific_name": data.get("scientificName"),
            "price": float(data.get("price", 150)),
            "water": data.get("water"),
            "sunlight": data.get("sunlight"),
            "size": data.get("size"),
            "is_featured": bool(data.get("isFeatured", False)),
            "description": data.get("description"),
            "image_url": data.get("image")
        }

        response = supabase.table('plants').update(update_payload).eq('id', plant_id).execute()
        
        if not response.data:
            return jsonify({"error": "Plant not found or update failed."}), 404
            
        return jsonify(to_frontend_format(response.data[0])), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 4. DELETE: Purge plant from inventory
@app.route('/api/plants/<plant_id>', methods=['DELETE'])
def delete_plant(plant_id):
    try:
        response = supabase.table('plants').delete().eq('id', plant_id).execute()
        
        if not response.data:
            return jsonify({"error": "Plant not found or delete failed."}), 404
            
        return jsonify({"message": f"Plant {plant_id} deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)