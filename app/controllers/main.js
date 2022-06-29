// Cần call api để lấy danh sách người dùng vầ hiển thị ra giao diện
// Hàm main sẽ được chạy khi ứng dụng được khởi chạy
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
        user.tk,
        user.mk,
        user.name,
        user.email,
        user.language,
        user.type,
        user.image
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
    <tr>
        <td>${i + 1}</td>
        <td>${user.tk}</td>
        <td>${user.mk}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.language}</td>
        <td>${user.type}</td>
        <td>
            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="update" data-id="${
              user.id
            }">Update</button>
            <button data-type="delete" data-id="${
              user.id
            }" class="btn btn-danger">Delete</button>

        </td>
    </tr>
    `;
  }
  // Dom tới tbody
  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}
// Hàm xử lí gọi API người dùng
function addUser() {
  var tk = document.getElementById("TaiKhoan").value;
  var mk = document.getElementById("MatKhau").value;
  var name = document.getElementById("HoTen").value;
  var email = document.getElementById("Email").value;
  var language = document.getElementById("loaiNgonNgu").value;
  var type = document.getElementById("loaiNguoiDung").value;
  var image = document.getElementById("HinhAnh").value;

  // B2:Khởi tạo đối tượng
  var user = new User(null, tk, mk, name, email, language, type, image);
  // B3; GỌi API thêm sản phẩm

  apiAddUsers(user)
    .then((result) => {
      console.log(result.data);
      main();
      resetForm()
    })
    .catch((error) => {
      console.log(error);
    });
}
// Hàm xóa người dùng
function deleteUser(userId) {
  apiDeleteUsers(userId)
    .then(() => {
      // xóa thành công
      main();
    })
    .catch((error) => {
      console.log(error);
    });
}
// Hàm xử lí gọi API cập nhật sản phẩm
function updateUser() {
  var id = document.getElementById("Ma").value;
  var tk = document.getElementById("TaiKhoan").value;
  var mk = document.getElementById("MatKhau").value;
  var name = document.getElementById("HoTen").value;
  var email = document.getElementById("Email").value;
  var language = document.getElementById("loaiNgonNgu").value;
  var type = document.getElementById("loaiNguoiDung").value;
  var image = document.getElementById("HinhAnh").value;

  // B2 Khởi tạo đối tượng
  var user = new User(id, tk, mk, name, email, language, type, image);
  // B3 Gọi APi cập nhật sản phẩm
  apiUpdateUser(user)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  document.querySelector(".modal-title").innerHTML = "Add user";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class="btn btn-success" data-type="add" data-toggle="modal" data-target="#myModal">Thêm</button> <button class="btn btn-secondary" data-toggle="modal" data-target="#myModal" >Hủy</button>`;
}
// ủy quyền lắng nghe event của cấc thẻ button từ thẻ .modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
// Các hàm callback được gọi tới khi event được kích hoạt đồng thời nhận được 1 tham số lầ đối tượng event
function handleSubmit(event) {
  console.log(event.target);
  var type = event.target.getAttribute("data-type");
  switch (type) {
    case "add":
      addUser();
      break;
    case "update":
      updateUser();
      break;
    default:
      break;
  }
}

// Ủy quyền lắng nghe tất cả event của button xóa và cập nhật trong table cho tbody
document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", handleUserAction);
function handleUserAction(event) {
  // Loại button
  var type = event.target.getAttribute("data-type");
  var id = event.target.getAttribute("data-id");
  switch (type) {
    case "delete":
      deleteUser(id);
      break;
    case "update": {
      // cập nhật giao diện cho modal và call APi get thông tin của sản phẩm và fill lên form
      showUpdateModal(id);
      break;
    }

    default:
      break;
  }
}
// Hàm này dùng để cập nhật giao diện cho maodal và update và call API và lấy chi tiết sản phẩm  để hiển thị ra giao diên
function showUpdateModal(userId) {
  document.querySelector(".modal-title").innerHTML = "Cập nhật sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class="btn btn-success" data-type="update" data-toggle="modal" data-target="#myModal">Cập nhật</button> <button class="btn btn-secondary" data-toggle="modal" data-target="#myModal" >Hủy</button>`;
  // call API để lấy chi tiết sản phẩm
  apiGetUserDetail(userId)
    .then((result) => {
      // Thành công, fill data lên form
      var user = result.data;
      document.getElementById("Ma").value = user.id;
      document.getElementById("TaiKhoan").value = user.tk;
      document.getElementById("MatKhau").value = user.mk;
      document.getElementById("HoTen").value = user.name;
      document.getElementById("Email").value = user.email;
      document.getElementById("loaiNgonNgu").value = user.language;
      document.getElementById("loaiNguoiDung").value = user.type;
      document.getElementById("HinhAnh").value = user.image;
    })
    .catch((error) => {
      console.log(error);
    });
}
document.getElementById("txtSearch").addEventListener("keypress", handleSearch);
function handleSearch(evt) {
  console.log(evt);
  if (evt.key !== "Enter") return;
  var value = evt.target.value;
  apiGetUsers(value).then((result) => {
    var users = result.data;
    // sau khi lấy được data từ API Thành công
    // Duyệt mảng data và khởi tạo các đối tượng User
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      users[i] = new User(
        user.id,
        user.tk,
        user.mk,
        user.name,
        user.email,
        user.language,
        user.type,
        user.image
      );
    }
    console.log(users);
    // Gọi hàm display để hiển thị danh sách ra giao diện
    display(users);
  });
}
// Hàm xử lí reset form và đóng modal
function resetForm() {
  document.getElementById("Ma").value = "";
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("loaiNgonNgu").value = "";
  document.getElementById("loaiNguoiDung").value = "";
  document.getElementById("HinhAnh").value = "";
  $("#myModal").modal("hide");
}
