const URL = "http://localhost:8000";
const post_URL = `${URL}/property/post_property/`;
const list_URL = `${URL}/property/user_property/`;
const property_URL = `${URL}/property/list/`;
const Upload_URL = `${URL}/property/uploadexcel/`;
const delete_URL = `${URL}/property/delete_property/`;
const update_URL = `${URL}/property/update_property/`;


export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}



export const inputProperty = async (data, Added) => {
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
    const csrfToken = getCookie('csrftoken');
    const token = localStorage.getItem("token");
    const response = await fetch(post_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // include token in Authorization header
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    });
    if (response.ok) {
      console.log("Property added successfully");
      Added();
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
    const csrfToken = getCookie('csrftoken');
    const token = localStorage.getItem("token");
    const response = await fetch(list_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include token in Authorization header
        "X-CSRFToken":csrfToken
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

export const FetchProperty = async (id) => {
  try {
    const csrfToken = getCookie('csrftoken');
    const token = localStorage.getItem("token");
    const response = await fetch(property_URL + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include token in Authorization header
        "X-CSRFToken":csrfToken
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const UploadExcel = async (file, Added) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const csrfToken = getCookie('csrftoken');
    const token = localStorage.getItem("token");
    const response = await fetch(Upload_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    });
    if (response.ok) {
      alert("Property added successfully");
      Added();
    } else {
      const error = await response.json();
      alert(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const DeleteProperty = async (id, Deleted) => {
  try {
    const csrfToken = getCookie('csrftoken');

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("id", id);
    const response = await fetch(delete_URL + id, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-CSRFToken": csrfToken,
      },
    });
    if (response.ok) {
      Deleted();
      console.log("Deleted");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateProperty = async (id, data, Updated) => {
  try {
    const csrfToken = getCookie('csrftoken');

    const token = localStorage.getItem("token");
    const response = await fetch(update_URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      Updated();
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    }
  } catch (error) {
    console.log(error.message);
  }
};
