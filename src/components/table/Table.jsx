import {useState, } from 'react';
import axios from "axios";

const Table = ({ id, name, email, birthday_date, phone_number, address }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ name, email, birthday_date, phone_number, address });

const handleEditClick = () => {
    setIsEditing(true);
  };

const handleSaveClick = () => {
  if (!editedData.name || !editedData.email || !editedData.birthday_date || !editedData.phone_number) {
    return;
  }
    const updatedData = {
      id: id,
      name: editedData.name,
      email: editedData.email,
      birthday_date: editedData.birthday_date,
      phone_number: editedData.phone_number,
      address: editedData.address || '',
    };
    // збереження даних на сервері
    const saveUrl = `https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`;
  
    axios
      .put(saveUrl, updatedData)
      .then((response) => {
        console.log('Дані успішно збережено на сервері');
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Помилка при збереженні на сервері', error);
      });
  };

const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>ID</th>
              <th style={{ width: '150px' }}>Name</th>
              <th style={{ width: '250px' }}>Email</th>
              <th style={{ width: '100px' }}>Birthday</th>
              <th style={{ width: '150px' }}>Phone</th>
              <th style={{ width: '300px' }}>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id}</td>
              {isEditing ? (
                <>
                  <td>
                    <input
                      type="name"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      maxLength={255} 
                      minLength={1}
                      required
                      title='Name'
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      maxLength={254} 
                      minLength={1}
                      required
                      title='Email'
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="birthday_date"
                      value={editedData.birthday_date}
                      onChange={handleChange}
                      required
                      title='Birthday date'
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone_number"
                      value={editedData.phone_number}
                      onChange={handleChange}
                      maxLength={20} 
                      minLength={1} 
                      required
                      title='Phone number'
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={editedData.address}
                      onChange={handleChange}
                      minLength={1} 
                      required
                      title='Address'
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{birthday_date}</td>
                  <td>{phone_number}</td>
                  <td>{address}</td>
                </>
              )}
              <td>
                {isEditing ? (
                  <button onClick={handleSaveClick}>Зберегти</button>
                ) : (
                  <button onClick={handleEditClick}>Редагувати</button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
