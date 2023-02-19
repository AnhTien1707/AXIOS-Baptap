function callAPI() {
    this.fetchListStaff = function () {
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
            method: "GET",
        });
    }
    this.addStaff = function (staff) {
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
            method: "POST",
            data: staff,
        });
    }
    this.deleteStaff = function(id){
        return axios({
            url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=" + id,
            method: "DELETE"
        });
    }
    this.getStaff = function(id){
        return axios({
            url:"http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=" + id,
            method: "GET",
        })
    }
    this.updateStaff = function(staff){
        return axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${staff.maNhanVien}`,
            method : "PUT",
            data : staff
        })
    }
}