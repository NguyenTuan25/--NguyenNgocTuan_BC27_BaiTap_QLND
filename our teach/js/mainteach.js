main();
function main() {
  // B1: gọi api lấy danh sách người dùng
  apiGetUsers().then((result) => {
    // console.log(result.data);
    var users = result.data;
    // sau khi lấy được data từ API Thành công
    // Duyệt mảng data và khởi tạo các đối tượng User
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      users[i] = new User(
        user.id,
        user.name,
        user.image,
        user.language,
        user.type,
        user.mota
      );
    }
    console.log(users);
    // Gọi hàm display để hiển thị danh sách ra giao diện
    display(users);
  });
}
function display(users) {
  var html = "";
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    html += `
    <div class="people">
      <div class="people-img">
        <img src="${user.image}"/>
      </div>
      <div class="people-content text-center bg-white">
        <h5>${user.language}</h5>
        <h4>${user.name}</h4>
        <p>${user.mota}</p>
      </div>
    </div>`;
  }
  document.getElementById("row").innerHTML = html;
}
