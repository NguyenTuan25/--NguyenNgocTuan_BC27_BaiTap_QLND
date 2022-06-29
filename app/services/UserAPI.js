var baseURL = "https://62ba6d7a7bdbe01d5288e566.mockapi.io/api/users";
function apiGetUsers(search) {
  return axios({
    url: baseURL,
    method: "GET",
    params: {
      type: search,
    },
  });
}
function apiAddUsers(user) {
  return axios({
    url: baseURL,
    method: "POST",
    data: user,
  });
}
function apiDeleteUsers(userId) {
  return axios({
    url: `${baseURL}/${userId}`,
    method: "DELETE",
  });
}
// hàm call API lấy chi tiết sản phẩm
function apiGetUserDetail(userId) {
  return axios({
    url: `${baseURL}/${userId}`,
    method: "GET",
  });
}
function apiUpdateUser(user) {
  return axios({
    url: `${baseURL}/${user.id}`,
    data: user,
    method: "PUT",
  });
}
