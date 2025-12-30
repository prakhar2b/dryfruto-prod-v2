# Seed Data for DryFruto - Extracted from Production
# This file contains the seed data used by the "Seed Initial Data" button in admin panel

LOGO_URL = "https://customer-assets.emergentagent.com/job_70b8c44d-b0eb-46ab-b798-c90870274405/artifacts/5olvlaa7_WhatsApp%20Image%202025-12-26%20at%2013.46.33.jpeg"

# Site Settings
SEED_SITE_SETTINGS = {
    "id": "site_settings",
    "businessName": "DryFruto",
    "slogan": "Live With Health",
    "logo": LOGO_URL,
    "phone": "9870990795",
    "email": "info@dryfruto.com",
    "careerEmail": "careers@dryfruto.com",
    "whatsappLink": "https://wa.me/919870990795",
    "facebookLink": "",
    "instagramLink": "",
    "twitterLink": "",
    "youtubeLink": "",
    "bulkOrderProductTypes": ["Dry Fruits", "Nuts", "Seeds", "Berries", "Gift Boxes", "Mixed Products"],
    "bulkOrderBenefits": [
        "Direct sourcing from farms ensures freshness",
        "Minimum order quantity: 10 kg",
        "Special rates for orders above 100 kg",
        "Custom packaging with your branding",
        "Regular supply contracts available",
        "Quality testing certificates provided"
    ],
    "aboutHeroSubtitle": "Your trusted partner for premium quality dry fruits, nuts, and seeds since 2014.",
    "aboutStoryParagraphs": [
        "DryFruto was born from a simple belief – everyone deserves access to pure, high-quality dry fruits at fair prices. What started as a small family business has grown into a trusted name in the dry fruits industry.",
        "We work directly with farmers and suppliers to bring you the freshest products without any middlemen. Our commitment to quality and customer satisfaction has helped us build lasting relationships with thousands of families across India.",
        "Today, we continue our journey with the same passion and dedication, bringing health and happiness to every household through our carefully curated selection of dry fruits, nuts, seeds, and berries."
    ],
    "aboutStoryImage": "https://images.unsplash.com/photo-1596591868264-6d8f43c0e648?w=600",
    "aboutStats": [
        {"number": "10+", "label": "Years of Experience"},
        {"number": "50K+", "label": "Happy Customers"},
        {"number": "100+", "label": "Premium Products"},
        {"number": "500+", "label": "Cities Served"}
    ],
    "aboutVision": "To be India's most trusted and preferred destination for premium dry fruits, making healthy eating accessible and affordable for every household. We envision a future where quality nutrition is not a luxury but a way of life for all.",
    "aboutVisionPoints": [
        "Be the #1 dry fruits brand in India",
        "Reach every corner of the country",
        "Promote healthy living through quality products"
    ],
    "aboutMission": "To deliver the finest quality dry fruits sourced directly from farms, ensuring freshness, purity, and value for our customers. We are committed to ethical sourcing, sustainable practices, and exceptional customer service.",
    "aboutMissionPoints": [
        "Source directly from trusted farmers",
        "Maintain highest quality standards",
        "Provide excellent customer experience"
    ],
    "aboutValues": [
        {"title": "Quality First", "desc": "We source only the finest dry fruits from trusted farms across the globe."},
        {"title": "Natural & Pure", "desc": "No artificial additives, preservatives, or chemicals in our products."},
        {"title": "Trust & Transparency", "desc": "Honest pricing and complete transparency in our business practices."},
        {"title": "Fresh Delivery", "desc": "Carefully packed and delivered fresh to your doorstep."}
    ],
    "aboutWhyChooseUs": [
        {"name": "Quality Assurance", "desc": "Every product goes through strict quality checks before reaching you."},
        {"name": "Customer Support", "desc": "Dedicated team to assist you with any queries or concerns."},
        {"name": "Logistics", "desc": "Efficient delivery network ensuring timely and safe delivery."}
    ]
}

# Categories
SEED_CATEGORIES = [
    {"id": "cat-nuts-dry-fruits", "name": "Nuts & Dry Fruits", "slug": "nuts-dry-fruits", "image": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=600", "icon": "https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "cat-dates", "name": "Dates", "slug": "dates", "image": "https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&cs=tinysrgb&w=600", "icon": "https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "cat-mix-dry-fruits", "name": "Mix Dry Fruits", "slug": "mix-dry-fruits", "image": "https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=600", "icon": "https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "cat-makhana", "name": "Makhana", "slug": "makhana", "image": "https://images.pexels.com/photos/7446005/pexels-photo-7446005.jpeg?auto=compress&cs=tinysrgb&w=600", "icon": "https://images.pexels.com/photos/7446005/pexels-photo-7446005.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "cat-seeds", "name": "Seeds", "slug": "seeds", "image": "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=600", "icon": "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "cat-gift-boxes", "name": "Gift Boxes", "slug": "gift-boxes", "image": "https://images.pexels.com/photos/264892/pexels-photo-264892.jpeg?auto=compress&cs=tinysrgb&w=600", "icon": "https://images.pexels.com/photos/264892/pexels-photo-264892.jpeg?auto=compress&cs=tinysrgb&w=100"}
]

# Products
SEED_PRODUCTS = [
    {"id": "prod-almonds", "name": "Premium California Almonds", "slug": "premium-california-almonds", "category": "nuts-dry-fruits", "type": "Almonds", "basePrice": 145.0, "image": "https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF001", "shortDescription": "Premium quality California almonds, rich in nutrients.", "description": "Our Premium California Almonds are carefully selected from the finest orchards.", "benefits": ["Rich in Vitamin E", "Supports heart health", "High protein content"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-cashews", "name": "Jumbo Cashews Premium", "slug": "jumbo-cashews-premium", "category": "nuts-dry-fruits", "type": "Cashews", "basePrice": 185.0, "image": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF002", "shortDescription": "Large, creamy jumbo cashews with rich buttery taste.", "description": "Our Jumbo Cashews are the finest quality whole cashews.", "benefits": ["Source of magnesium", "Promotes brain function", "Supports bone health"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-roasted-cashews", "name": "Roasted Salted Cashews", "slug": "roasted-salted-cashews", "category": "nuts-dry-fruits", "type": "Roasted Cashews", "basePrice": 210.0, "image": "https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF003", "shortDescription": "Perfectly roasted cashews with Himalayan salt.", "description": "Our Roasted Salted Cashews are dry roasted to perfection.", "benefits": ["Satisfying crunchy snack", "Plant protein source", "Heart-healthy fats"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-walnuts", "name": "Premium Walnut Kernels", "slug": "premium-walnut-kernels", "category": "nuts-dry-fruits", "type": "Walnuts", "basePrice": 250.0, "image": "https://images.pexels.com/photos/4033327/pexels-photo-4033327.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/4033327/pexels-photo-4033327.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF004", "shortDescription": "Light halves walnut kernels for brain health.", "description": "Premium Walnut Kernels rich in omega-3 fatty acids.", "benefits": ["Omega-3 fatty acids", "Brain health support", "Anti-inflammatory"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-raisins", "name": "Afghan Black Raisins", "slug": "afghan-black-raisins", "category": "nuts-dry-fruits", "type": "Raisins", "basePrice": 85.0, "image": "https://images.pexels.com/photos/4033329/pexels-photo-4033329.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/4033329/pexels-photo-4033329.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF005", "shortDescription": "Premium Afghan black raisins, naturally sweet.", "description": "Sun-dried grapes from the finest Afghan vineyards.", "benefits": ["Natural iron source", "Boosts energy", "Digestive health"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-mix", "name": "Premium Mix Dry Fruits", "slug": "premium-mix-dry-fruits", "category": "mix-dry-fruits", "type": "Mix dry fruits", "basePrice": 165.0, "image": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF006", "shortDescription": "Perfect blend of almonds, cashews, raisins.", "description": "Carefully curated blend of finest dry fruits.", "benefits": ["Complete nutrition", "Variety of flavors", "Healthy snacking"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-pista", "name": "Pista Akbari Premium", "slug": "pista-akbari-premium", "category": "nuts-dry-fruits", "type": "Pistachios", "basePrice": 195.0, "image": "https://images.pexels.com/photos/6157057/pexels-photo-6157057.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/6157057/pexels-photo-6157057.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF007", "shortDescription": "Large Akbari pistachios with vibrant green color.", "description": "Finest quality Iranian pistachios.", "benefits": ["Excellent protein source", "Rich in fiber", "Eye health"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-makhana", "name": "Makhana Plain Premium", "slug": "makhana-plain-premium", "category": "makhana", "type": "Makhana", "basePrice": 175.0, "image": "https://images.pexels.com/photos/7446005/pexels-photo-7446005.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/7446005/pexels-photo-7446005.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF008", "shortDescription": "Light and crunchy fox nuts for healthy snacking.", "description": "Premium Makhana handpicked and processed.", "benefits": ["Low calorie snack", "Rich in calcium", "Anti-aging"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-figs", "name": "Premium Dried Figs", "slug": "premium-dried-figs", "category": "nuts-dry-fruits", "type": "Dried Fig", "basePrice": 220.0, "image": "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF009", "shortDescription": "Soft and sweet Turkish dried figs.", "description": "Premium Dried Figs sourced from Turkey.", "benefits": ["Dietary fiber", "Heart health", "Strong bones"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-pumpkin-seeds", "name": "Pumpkin Seeds Raw", "slug": "pumpkin-seeds-raw", "category": "seeds", "type": "Pumpkin Seeds", "basePrice": 125.0, "image": "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF010", "shortDescription": "Raw green pumpkin seeds with zinc.", "description": "Nutrient-dense hulled pumpkin seeds.", "benefits": ["Source of zinc", "High in magnesium", "Sleep quality"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-sunflower-seeds", "name": "Sunflower Seeds Raw", "slug": "sunflower-seeds-raw", "category": "seeds", "type": "Sunflower Seeds", "basePrice": 95.0, "image": "https://images.pexels.com/photos/4750269/pexels-photo-4750269.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/4750269/pexels-photo-4750269.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF011", "shortDescription": "Nutrient-rich sunflower seeds.", "description": "Raw Sunflower Seeds packed with vitamin E.", "benefits": ["Rich in Vitamin E", "Selenium for immunity", "Healthy skin"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}},
    {"id": "prod-dates", "name": "Medjool Dates Premium", "slug": "medjool-dates-premium", "category": "dates", "type": "Dates", "basePrice": 320.0, "image": "https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&cs=tinysrgb&w=500", "images": ["https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&cs=tinysrgb&w=500"], "sku": "DRF012", "shortDescription": "Large, soft Medjool dates.", "description": "Premium Medjool Dates - King of Dates.", "benefits": ["Natural energy", "Rich in potassium", "Digestive health"], "features": ["Healthy Heart", "Gluten Free"], "priceVariants": {}}
]

# Hero Slides
SEED_HERO_SLIDES = [
    {"id": "hero-1", "title": "Premium Quality Dry Fruits", "subtitle": "Live With Health", "description": "Discover our handpicked selection of premium dry fruits, nuts, and seeds", "image": "https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop", "cta": "Shop Now"},
    {"id": "hero-2", "title": "Festival Gift Hampers", "subtitle": "Celebrate with Health", "description": "Beautiful gift boxes perfect for every occasion", "image": "https://images.pexels.com/photos/4033324/pexels-photo-4033324.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop", "cta": "View Collection"},
    {"id": "hero-3", "title": "Healthy Seeds & Makhana", "subtitle": "Nature's Best", "description": "Explore our range of nutrient-rich seeds and fox nuts", "image": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop", "cta": "Explore Now"}
]

# Testimonials
SEED_TESTIMONIALS = [
    {"id": "test-1", "name": "Priya Sharma", "review": "Excellent quality dry fruits! The almonds and cashews are always fresh and delicious.", "avatar": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "test-2", "name": "Rajesh Kumar", "review": "Best place for premium dry fruits. Excellent packaging and timely delivery!", "avatar": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "test-3", "name": "Anita Patel", "review": "The gift boxes are perfect for occasions. Everyone loved them!", "avatar": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "test-4", "name": "Mohammed Ali", "review": "Fresh and premium quality nuts. The Makhana is crispy and tasty!", "avatar": "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "test-5", "name": "Sunita Verma", "review": "Amazing customer service and product quality. The dates are the best!", "avatar": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"},
    {"id": "test-6", "name": "Vikram Singh", "review": "Top-notch quality with amazing flavor. Perfect for daily snacking!", "avatar": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"}
]

# Gift Boxes
SEED_GIFT_BOXES = [
    {"id": "gift-1", "name": "Premium Gift Hamper", "image": "https://images.pexels.com/photos/5945770/pexels-photo-5945770.jpeg?auto=compress&cs=tinysrgb&w=500", "price": 1499.0},
    {"id": "gift-2", "name": "Festive Delight Box", "image": "https://images.pexels.com/photos/4033324/pexels-photo-4033324.jpeg?auto=compress&cs=tinysrgb&w=500", "price": 1999.0},
    {"id": "gift-3", "name": "Corporate Gift Set", "image": "https://images.pexels.com/photos/264892/pexels-photo-264892.jpeg?auto=compress&cs=tinysrgb&w=500", "price": 2499.0},
    {"id": "gift-4", "name": "Royal Collection Box", "image": "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=500", "price": 3499.0},
    {"id": "gift-5", "name": "Anniversary Special", "image": "https://images.pexels.com/photos/5945759/pexels-photo-5945759.jpeg?auto=compress&cs=tinysrgb&w=500", "price": 2999.0},
    {"id": "gift-6", "name": "Diwali Gift Box", "image": "https://images.pexels.com/photos/4033321/pexels-photo-4033321.jpeg?auto=compress&cs=tinysrgb&w=500", "price": 1799.0}
]
