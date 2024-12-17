import React, { useState, useEffect } from 'react';
import vietnamData from '../../data/full_json_generated_data_vn_units.json';

const ShippingForm = ({ onShippingChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
  
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
  
    useEffect(() => {
      const provincesData = vietnamData.filter(item => item.Type === 'province');
      setProvinces(provincesData); // Lưu dữ liệu tỉnh
    }, []);
  
    useEffect(() => {
      if (selectedProvince) {
        const province = vietnamData.find(p => p.Code === selectedProvince);
        setDistricts(province ? province.District : []);
      }
    }, [selectedProvince]);
  
    useEffect(() => {
      if (selectedDistrict) {
        const province = vietnamData.find(p => p.Code === selectedProvince);
        const district = province?.District.find(d => d.Code === selectedDistrict);
        setWards(district ? district.Ward : []);
      }
    }, [selectedDistrict, selectedProvince]);
  
    const handleProvinceChange = (event) => {
      setSelectedProvince(event.target.value);
      setSelectedDistrict(''); // Reset quận/huyện khi chọn lại tỉnh
      setSelectedWard(''); // Reset phường/xã khi chọn lại tỉnh
      const province = vietnamData.find(p => p.Code === event.target.value);
      onShippingChange({
        province: province ? province.FullName : '',
        district: '',
        ward: ''
      });
    };
  
    const handleDistrictChange = (event) => {
      setSelectedDistrict(event.target.value);
      setSelectedWard(''); // Reset phường/xã khi chọn lại quận
      const province = vietnamData.find(p => p.Code === selectedProvince);
      const district = province?.District.find(d => d.Code === event.target.value);
      onShippingChange({
        province: province ? province.FullName : '',
        district: district ? district.FullName : '',
        ward: ''
      });
    };
  
    const handleWardChange = (event) => {
      setSelectedWard(event.target.value);
      const province = vietnamData.find(p => p.Code === selectedProvince);
      const district = province?.District.find(d => d.Code === selectedDistrict);
      const ward = district?.Ward.find(w => w.Code === event.target.value);
      onShippingChange({
        province: province ? province.FullName : '',
        district: district ? district.FullName : '',
        ward: ward ? ward.FullName : ''
      });
    };
  
    return (
        <div style={{ maxWidth: '800px' }}>
        <div className="single-input-item" style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
            Tỉnh/Thành phố:
          </label>
          <select 
            value={selectedProvince} 
            onChange={handleProvinceChange} 
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px', 
              border: '1px solid #ddd', 
              borderRadius: '4px', 
              backgroundColor: '#fff', 
              transition: 'border 0.3s ease' 
            }}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option key={province.Code} value={province.Code}>
                {province.FullName}
              </option>
            ))}
          </select>
        </div>
      
        {selectedProvince && (
          <div className="single-input-item" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
              Quận/Huyện:
            </label>
            <select 
              value={selectedDistrict} 
              onChange={handleDistrictChange} 
              style={{ 
                width: '100%', 
                padding: '10px', 
                fontSize: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                backgroundColor: '#fff', 
                transition: 'border 0.3s ease' 
              }}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option key={district.Code} value={district.Code}>
                  {district.FullName}
                </option>
              ))}
            </select>
          </div>
        )}
      
        {selectedDistrict && (
          <div className="single-input-item" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#333' }}>
              Phường/Xã:
            </label>
            <select 
              value={selectedWard} 
              onChange={handleWardChange} 
              style={{ 
                width: '100%', 
                padding: '10px', 
                fontSize: '16px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                backgroundColor: '#fff', 
                transition: 'border 0.3s ease' 
              }}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.Code} value={ward.Code}>
                  {ward.FullName}
                </option>
              ))}
            </select>
          </div>
        )}
        
      </div>
      
      
   
    );
  };
  
  export default ShippingForm;
  


