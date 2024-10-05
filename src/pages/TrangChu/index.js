import React from 'react';

function TrangChu() {
  return (
    <div>
      <div
        className="row"
        style={{
          marginTop: '10px',
          justifyContent: 'space-between',
          marginLeft: '200px',
          marginRight: '200px',
        }}
      >
        <div className="col-md-6 mb-4">
          <div
            style={{
              backgroundColor: 'rgb(98, 196, 98)',
              padding: '20px',
              borderRadius: '10px',
              margin: '0 5px',
              width: '685px',
              height: 'auto',
            }}
          >
            <h3 style={{ color: '#006400' }}>Thông tin mới nhất</h3>
            <h5>5 cuốn sách cùng bạn trẻ vững tâm bước vào năm 2024</h5>
            <img
              src="https://cdnphoto.dantri.com.vn/if-6YeXxVTiv8Ben-x-6gSecuAo=/thumb_w/1020/2024/02/06/dt-thoi-dai-thu-tu-1707234628892.jpg"
              alt="Event"
              style={{ width: '50%', height: 'auto', marginBottom: '20px' }}
            />
            <p>
              Sách về AI - "Thời đại thứ tư". Báo cáo Google Year in Search 2023 cho thấy AI (Artificial intelligence -
              trí tuệ nhân tạo) là một trong những chủ đề được tìm kiếm nhiều nhất năm qua tại Việt Nam...
            </p>
            <button type="button" className="btn btn-primary mx-1">
              Xem chi tiết
            </button>
            <button type="button" className="btn btn-secondary mx-1">
              Chia sẻ
            </button>
          </div>
        </div>
        <div className="col-md-6 mb-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              backgroundColor: 'rgb(98, 196, 98)',
              padding: '20px',
              borderRadius: '10px',
              margin: '0 5px',
              width: '375px',
              marginRight: '20px',
              height: 'auto',
            }}
          >
            <h3 style={{ color: '#006400' }}>Chỉ dẫn</h3>
            <img
              src="https://lh6.googleusercontent.com/proxy/bzJLx4YVigSpw3yU3moO5YTTjfVEVOF8yg6sBrzqfmFUdt9ZX3xW8_RHf-E_RY-b3jMV3cswDDxDeHr_cA0ysLu4Vru5uemF9zFws_Y_Xw"
              alt="Event"
              style={{ width: '90%', height: 'auto', marginBottom: '20px' }}
            />
            <p>Giờ mở cửa: [chi tiết]</p>
            <p>Video hướng dẫn sử dụng thư viện: [chi tiết]</p>
            <p>Nội quy thư viện: [chi tiết]</p>
            <button type="button" className="btn btn-primary mx-1">
              Xem chi tiết
            </button>
            <button type="button" className="btn btn-secondary mx-1">
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrangChu;