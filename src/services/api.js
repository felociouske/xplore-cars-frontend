const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const fetchCars = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/`);
    if (!response.ok) throw new Error("Failed to fetch cars");

    const data = await response.json();

    const normalizedData = (Array.isArray(data) ? data : data.results || []).map(car => ({
      ...car,
      images: (car.images || [])
        .map((img) => {
          const path = typeof img === "string" ? img : img?.image;
          if (!path) return null;
          return path.startsWith("http") ? path : `${API_BASE_URL.replace("/api", "")}${path}`;
        })
        .filter(Boolean),
    }));

    return normalizedData;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};


export async function submitEnquiry(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to submit enquiry");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    throw error;
  }
}


export async function submitCarEnquiry(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/car-enquiries/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to submit car enquiry");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting car enquiry:", error);
    throw error;
  }
}


export async function fetchBlogPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/`);
    if (!response.ok) throw new Error("Failed to fetch blog posts");
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function fetchBlogPost(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}/`);
    if (!response.ok) throw new Error("Failed to fetch blog post");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}