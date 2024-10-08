import React from 'react';

function TrangChu() {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-7 col-md-6 mb-4">
          <div className="bg-success bg-opacity-25 p-4 rounded h-100">
            <h3 className="text-success">Thông tin mới nhất</h3>
            <h5>5 cuốn sách cùng bạn trẻ vững tâm bước vào năm 2024</h5>
            <div className="text-center mb-3">
              <img
                src="https://cdnphoto.dantri.com.vn/if-6YeXxVTiv8Ben-x-6gSecuAo=/thumb_w/1020/2024/02/06/dt-thoi-dai-thu-tu-1707234628892.jpg"
                alt="Event"
                className="img-fluid w-75"
              />
            </div>
            <p>
              Sách về AI - "Thời đại thứ tư". Báo cáo Google Year in Search 2023 cho thấy AI (Artificial intelligence -
              trí tuệ nhân tạo) là một trong những chủ đề được tìm kiếm nhiều nhất năm qua tại Việt Nam...
            </p>
            <div className="mt-3">
              <button type="button" className="btn btn-primary me-2">
                Xem chi tiết
              </button>
              <button type="button" className="btn btn-secondary">
                Chia sẻ
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-5 col-md-6 mb-4">
          <div className="bg-success bg-opacity-25 p-4 rounded h-100">
            <h3 className="text-success">Chỉ dẫn</h3>
            <div className="text-center mb-3">
              <img
                src="https://lh6.googleusercontent.com/proxy/bzJLx4YVigSpw3yU3moO5YTTjfVEVOF8yg6sBrzqfmFUdt9ZX3xW8_RHf-E_RY-b3jMV3cswDDxDeHr_cA0ysLu4Vru5uemF9zFws_Y_Xw"
                alt="Event"
                className="img-fluid w-90"
              />
            </div>
            <p>Giờ mở cửa: [chi tiết]</p>
            <p>Video hướng dẫn sử dụng thư viện: [chi tiết]</p>
            <p>Nội quy thư viện: [chi tiết]</p>
            <div className="mt-3">
              <button type="button" className="btn btn-primary me-2">
                Xem chi tiết
              </button>
              <button type="button" className="btn btn-secondary">
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrangChu;