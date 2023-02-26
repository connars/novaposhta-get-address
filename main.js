const apiKey = '65fa689752b60a1762ab7298895c6930';
const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';

const cityInput = document.getElementById('city');
const warehousesSelect = document.getElementById('warehouses');

const getWarehouses = async (city) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        apiKey: apiKey,
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityName: city,
        },
      }),
    });

    const data = await response.json();

    if (data.success) {
      warehousesSelect.innerHTML = '';
      data.data.forEach((warehouse) => {
        const option = document.createElement('option');
        option.text = `${warehouse.Description}`;
        option.value = warehouse.Ref;
        warehousesSelect.appendChild(option);
      });
    } else {
      console.log('Ошибка получения данных', data);
    }
  } catch (error) {
    console.log('Ошибка запроса', error);
  }
};

cityInput.addEventListener('input', () => {
  getWarehouses(cityInput.value);
});