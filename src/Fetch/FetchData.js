
const URL = "http://localhost:8000";
const post_URL = `${URL}/property/post_property/`;
const list_URL = `${URL}/property/user_property/`;
const property_URL = `${URL}/property/list/`;
const Upload_URL = `${URL}/property/uploadexcel/`;
const delete_URL = `${URL}/property/delete_property/`;
const update_URL = `${URL}/property/update_property/`;
const export_URL = `${URL}/property/getexcel/`;
const changePassword_URL=`${URL}/auth/reset/users/set_password/`
const Logout_URL=`${URL}/auth/logout/`
const Login_URL=`${URL}/auth/login/`


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

export const UserLogin=async(Login,data)=>{
  try {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch(Login_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonData = await response.json(); 
      Login();
      let token = jsonData.Token.access;
      localStorage.setItem("token", token);
      console.log("loggedIN");
    } else {
      alert("Wrong username or password");
      console.log("Invalid Email or password");
    }
  } catch (error) {
    console.log(error.message);
  }
};


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
  formData.append("is_tenant_active", true);
  formData.append("adhar_pic", data.adhar_pic[0]);
  
  const files=[...data.uploaded_images].slice(0,4)
  files.forEach(file=>{
    formData.append("uploaded_images",file)
  })
  
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
    if(response.status===400) return null
  } catch (error) {
    console.log(error)
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
  formData.append("is_tenant_active", true);
  formData.append("adhar_pic", data.adhar_pic[0]);

  const files=[...data.uploaded_images].slice(0,4)
  files.forEach(file=>{
    formData.append("uploaded_images",file)
  })
    const csrfToken = getCookie('csrftoken');

    const token = localStorage.getItem("token");
    const response = await fetch(update_URL + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-CSRFToken": csrfToken,
      },
      body: formData
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

export const fetchExcel = async () => {
  try {
    const csrfToken = getCookie('csrftoken')
    const token = localStorage.getItem('token')
    const response = await fetch(export_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-CSRFToken': csrfToken,
      },
      responseType: 'blob',
    })
    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'tenants.xlsx'
      link.click()
    }
  } catch (error) {
    console.log(error)
  }
}

export const UserLogout = async (Logout) => {
  try {
    const token = localStorage.getItem("token"); // get token from localStorage
    const response = await fetch(Logout_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include token in Authorization header
      },
    });
    if (response.ok) {
      Logout();
      localStorage.removeItem("token"); // remove token from localStorage
      console.log("Logged out successfully");
    } else {
      console.log("Logout failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const changePassword=async(data,Logout)=>{
  try {
    const csrfToken = getCookie('csrftoken')
    const token = localStorage.getItem('token')
    const response=await fetch(changePassword_URL,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(data)
    },
    )
    if (response.status === 204) {
      console.log('Password changed successfully.');
      UserLogout(Logout)
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  } catch (error) {
    console.log(error)
  }
} 