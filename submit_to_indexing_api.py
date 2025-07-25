import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
import time

# Load credentials from JSON key file
SERVICE_ACCOUNT_FILE = 'credentials.json'  # Replace with your JSON key path
SCOPES = ['https://www.googleapis.com/auth/indexing']

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

indexing_api = build('indexing', 'v3', credentials=credentials)

# All your blog URLs (including categories)
urls = [
    "https://wellness-gadget-insider.vercel.app/",
    "https://wellness-gadget-insider.vercel.app/blog",
    "https://wellness-gadget-insider.vercel.app/faq",
    "https://wellness-gadget-insider.vercel.app/about",
    "https://wellness-gadget-insider.vercel.app/blog/category/pain-management",
    "https://wellness-gadget-insider.vercel.app/blog/category/skincare-device",
    "https://wellness-gadget-insider.vercel.app/blog/category/stress-relief-methods",
    "https://wellness-gadget-insider.vercel.app/blog/category/home-medical-equipment",
    # Add more URLs if needed
]

for url in urls:
    try:
        response = indexing_api.urlNotifications().publish(
            body={"url": url, "type": "URL_UPDATED"}
        ).execute()
        print(f"✅ Submitted: {url} | Response: {response}")
        time.sleep(1)  # Avoid rate limits
    except Exception as e:
        print(f"❌ Failed {url}: {str(e)}")