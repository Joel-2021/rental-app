

const token = localStorage.getItem("token");
const post_URL = "http://127.0.0.1:8000/property/post_property/";
const list_URL = "http://127.0.0.1:8000/property/user_property/";
const property_URL="http://127.0.0.1:8000/property/list/";


export const inputProperty = async (data,add) => {
  const formData = new FormData();
  formData.append("property_name", data.property_name);
  formData.append("tenant_name", data.tenant_name);
  formData.append("age", data.age);
  formData.append("rent", data.rent);
  formData.append("rent_date", data.rent_date);
  formData.append("address", data.address);
  formData.append("email", data.email);
  formData.append("bhk", data.bhk);
  formData.append("phone_number", data.phone_number);
  formData.append("adhar_num", data.adhar_num);
  formData.append("adhar_pic", data.adhar_pic[0]);
  formData.append("property_pic", data.property_pic[0]);

  try {
    const response = await fetch(post_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // include token in Authorization header
      },
      body: formData,
    });
    if (response.ok) {
      console.log("Property added successfully");
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};


export const FetchPropertyList = async () => {
  try {
    const response = await fetch(list_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include token in Authorization header
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData.property;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const FetchProperty= async (id) => {
  try {
    const response = await fetch(property_URL+id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include token in Authorization header
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData)
      return jsonData;
    }
  } catch (error) {
    console.log(error.message);
  }
};