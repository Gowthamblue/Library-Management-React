import axios from "axios";

const BASE_URL = "http://localhost:8080/LibraryManagement/api/users";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  const { token, username, role, user_id } = response.data;
if(role === "MEMBER")
{
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("memberName", username);
  localStorage.setItem("memberId", user_id);

}
else if(role === "ADMIN")
{
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("adminName", username);
  localStorage.setItem("adminId", user_id);
}

  return response.data;
};

export async function registerMember(memberData) {
  const res = await axios.post(`${BASE_URL}/register`, memberData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}
