
export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
  bedrooms: number;
  amenities: string[];
  type: string; 
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Apartment in South Mumbai",
    description: "A spacious apartment with sea views, located in one of Mumbai's most prestigious areas.",
    price: 75000,
    imageUrl: "https://www.sobha.com/wp-content/uploads/2021/10/SOBHA-Arbor-Elevation-Mobile-o.webp",
    location: "Mumbai, Maharashtra",
    bedrooms: 3,
    amenities: ["Gym", "Pool", "Hot Tub"],
    type: "Apartment"
  },
  {
    id: 2,
    title: "Heritage House in Kolkata",
    description: "A historic house in the heart of Kolkata, featuring traditional architecture and modern comforts.",
    price: 45000,
    imageUrl: "https://media.istockphoto.com/id/1442148484/photo/3d-rendering-of-modern-suburban-house-in-the-garden.jpg?s=612x612&w=0&k=20&c=8Iu_h5cFOEnlPz4_n2nfSUtOyfM_a-hHx9rmlxMF2rI=",
    location: "Kolkata, West Bengal",
    bedrooms: 4,
    amenities: ["Hot Tub", "Fishing", "WiFi"],
    type: "House"
  },
  {
    id: 3,
    title: "Modern Studio in Bengaluru",
    description: "A chic studio apartment located in the tech hub of India, perfect for professionals.",
    price: 30000,
    imageUrl: "https://www.apartments.com/blog/sites/default/files/styles/small/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=e9OGR_ew",
    location: "Bengaluru, Karnataka",
    bedrooms: 1,
    amenities: ["WiFi", "Hot Tub", "Fishing"],
    type: "Studio"
  },
  {
    id: 4,
    title: "Penthouse in Gurgaon",
    description: "An exclusive penthouse with panoramic views, offering luxury living at its best.",
    price: 120000,
    imageUrl: "https://www.bhg.com/thmb/FcKK-L23QiqiDVjrjLgfa1uFZU8=/4000x0/filters:no_upscale():strip_icc()/101495134_preview-b192d3b7d4b04188a014754b9ffa6f79.jpg",
    location: "Gurgaon, Haryana",
    bedrooms: 5,
    amenities: ["Pool", "WiFi", "Fishing"],
    type: "Penthouse"
  },
  {
    id: 5,
    title: "Cozy Cottage in Ooty",
    description: "A charming cottage surrounded by tea gardens, ideal for a peaceful retreat.",
    price: 20000,
    imageUrl: "https://www.apartments.com/blog/sites/default/files/styles/small/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=e9OGR_ew",
    location: "Ooty, Tamil Nadu",
    bedrooms: 2,
    amenities: ["Hot Tub", "Hot Tub", "Barbecue"],
    type: "Cottage"
  },
  {
    id: 6,
    title: "Townhouse in Pune",
    description: "A modern townhouse in a gated community, offering a perfect blend of comfort and style.",
    price: 55000,
    imageUrl: "https://cdn.pixabay.com/photo/2023/12/17/09/47/door-8453898_1280.jpg",
    location: "Pune, Maharashtra",
    bedrooms: 4,
    amenities: ["WiFi", "Gym", "Pet Friendly"],
    type: "Townhouse"
  },
  {
    id: 7,
    title: "Luxury Loft in Hyderabad",
    description: "A contemporary loft in the heart of Hyderabad, featuring high ceilings and an open floor plan.",
    price: 60000,
    imageUrl: "https://www.apartments-mitte.de/wp-content/uploads/2023/12/premium-3-1.webp",
    location: "Hyderabad, Telangana",
    bedrooms: 5,
    amenities: ["Gym", "Pet Friendly", "Hot Tub"],
    type: "Loft"
  },
  {
    id: 8,
    title: "Beachfront Villa in Goa",
    description: "A stunning villa with direct beach access, perfect for a luxurious vacation.",
    price: 90000,
    imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/023/309/303/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
    location: "Goa",
    bedrooms: 4,
    amenities: ["Fishing", "Hot Tub", "Barbecue"],
    type: "House"
  },
  {
    id: 9,
    title: "Riverside Studio in Varanasi",
    description: "A serene studio apartment with views of the Ganges, ideal for spiritual seekers.",
    price: 25000,
    imageUrl: "https://www.apartments-mitte.de/wp-content/uploads/2023/12/premium-3-1.webp",
    location: "Varanasi, Uttar Pradesh",
    bedrooms: 6,
    amenities: ["WiFi", "Fishing", "Barbecue"],
    type: "Studio"
  },
  {
    id: 10,
    title: "Elegant Apartment in Jaipur",
    description: "A beautifully designed apartment in the Pink City, close to historic landmarks.",
    price: 35000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnmnJp8DuAYKdaaxlxkkBrfo_SICVMCZfLw&s",
    location: "Jaipur, Rajasthan",
    bedrooms: 2,
    amenities: ["Pool", "Gym", "Pet Friendly"],
    type: "Apartment"
  },
  {
    id: 11,
    title: "Hilltop Cottage in Shimla",
    description: "A quaint cottage perched on a hilltop, offering breathtaking views of the Himalayas.",
    price: 28000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RLl7zLf48A3bnxf9fQSZWH9rOoLVLQgKHw&s",
    location: "Shimla, Himachal Pradesh",
    bedrooms: 8,
    amenities: ["Barbecue", "Hot Tub", "Fishing"],
    type: "Cottage"
  },
  {
    id: 12,
    title: "Penthouse in Chandigarh",
    description: "A lavish penthouse with state-of-the-art amenities, located in a prime area of Chandigarh.",
    price: 110000,
    imageUrl: "https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=0&k=20&c=sxRQ398SxAjC4FrRombjl46oDGJVdy23T7i3RXO-mww=",
    location: "Chandigarh",
    bedrooms: 4,
    amenities: ["Pool", "WiFi", "Pet Friendly"],
    type: "Penthouse"
  },
  {
    id: 13,
    title: "Heritage House in Udaipur",
    description: "A regal house with traditional Rajasthani architecture, overlooking Lake Pichola.",
    price: 70000,
    imageUrl: "https://cms.interiorcompany.com/wp-content/uploads/2023/11/simple-house-design-stick-with-the-classics.png",
    location: "Udaipur, Rajasthan",
    bedrooms: 3,
    amenities: ["Barbecue", "Hot Tub", "Barbecue"],
    type: "House"
  },
  {
    id: 14,
    title: "Loft in Chennai",
    description: "A trendy loft in the cultural capital of South India, perfect for creative professionals.",
    price: 40000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6QrwzTCD_APnFFC7pfgVS9C4mXGoVS-UN3A&s",
    location: "Chennai, Tamil Nadu",
    bedrooms: 6,
    amenities: ["Gym", "Pet Friendly", "Hot Tub"],
    type: "Loft"
  },
  {
    id: 15,
    title: "Luxury Apartment in Ahmedabad",
    description: "A modern apartment with city views, located in a bustling area of Ahmedabad.",
    price: 50000,
    imageUrl: "https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=0&k=20&c=sxRQ398SxAjC4FrRombjl46oDGJVdy23T7i3RXO-mww=",
    location: "Ahmedabad, Gujarat",
    bedrooms: 3,
    amenities: ["Gym", "Pool", "WiFi"],
    type: "Apartment"
  },
  {
    id: 16,
    title: "Cozy Townhouse in Mysore",
    description: "A quaint townhouse with a garden, located close to Mysore Palace.",
    price: 32000,
    imageUrl: "https://img.freepik.com/free-photo/modern-house-architectural-design-photography_1409-6516.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725148800&semt=ais_hybrid",
    location: "Mysore, Karnataka",
    bedrooms: 3,
    amenities: ["Fishing", "WiFi", "Barbecue"],
    type: "Townhouse"
  },
  {
    id: 17,
    title: "Beachfront Cottage in Alibaug",
    description: "A picturesque cottage with direct access to the beach, perfect for a weekend retreat.",
    price: 27000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6QrwzTCD_APnFFC7pfgVS9C4mXGoVS-UN3A&s",
    location: "Alibaug, Maharashtra",
    bedrooms: 2,
    amenities: ["Fishing", "WiFi", "Pet Friendly"],
    type: "Cottage"
  },
  {
    id: 18,
    title: "Loft in Cochin",
    description: "A modern loft in the heart of Cochin, offering stunning views of the backwaters.",
    price: 38000,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6QrwzTCD_APnFFC7pfgVS9C4mXGoVS-UN3A&s",
    location: "Cochin, Kerala",
    bedrooms: 2,
    amenities: ["Barbecue", "Gym", "Parking"],
    type: "Loft"
  },
  {
    id: 19,
    title: "Colonial House in Darjeeling",
    description: "A beautiful colonial-era house with views of the tea plantations, ideal for nature lovers.",
    price: 60000,
    imageUrl: "https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=0&k=20&c=sxRQ398SxAjC4FrRombjl46oDGJVdy23T7i3RXO-mww=",
    location: "Darjeeling, West Bengal",
    bedrooms: 4,
    amenities: ["Barbecue", "Hot Tub", "Fishing"],
    type: "House"
  },
  {
    id: 20,
    title: "Penthouse in Navi Mumbai",
    description: "A stylish penthouse offering stunning city views, located in a prime area of Navi Mumbai.",
    price: 80000,
    imageUrl:"https://media.istockphoto.com/id/1442148484/photo/3d-rendering-of-modern-suburban-house-in-the-garden.jpg?s=612x612&w=0&k=20&c=8Iu_h5cFOEnlPz4_n2nfSUtOyfM_a-hHx9rmlxMF2rI=", 
    location: "Navi Mumbai, Maharashtra",
     bedrooms: 4,
    amenities: ["Fishing", "WiFi", "Fishing"],
     type: "Penthouse" } ];
