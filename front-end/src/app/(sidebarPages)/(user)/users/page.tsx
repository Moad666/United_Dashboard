'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function Page() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1) 
  const [rowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  }

  const filteredUsers = users.filter(user => user.fullName.toLowerCase().includes(searchValue.toLowerCase()));
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  useEffect(() => {
    // Fetch data
    fetch('http://localhost:3001/getUsers')
      .then(response => response.json())
      .then(data => setUsers(data.data.users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  function handleCheckAll(event) {
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = event.target.checked;
    });
}

const handleDeleteUser = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this user. This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Annuler',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3001/users/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    setUsers(users.filter(user => user.id !== id));
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User deleted successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    throw new Error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Something went wrong',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        }
    });
};


  return (
    <div>
        <div className="flex justify-center items-center">    
        <form className="max-w-md mx-auto">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" onChange={handleSearchChange}  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search for user ..." required style={{ width: '400px', height: '30px' }} />
            </div>
        </form>
    </div>
      <div className="mt-10 size-full flex justify-center">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b">
            <th className="text-left p-3 px-5 font-normal" onClick={handleCheckAll}>
                    <td><input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"/></td>
                    </th>
              <th className="text-left p-3 px-5 font-normal">Full Name & Email</th>
              <th className="text-left p-3 px-5 font-normal">Job</th>
              <th className="text-left p-3 px-5 font-normal">Role</th>
              <th className="text-left p-3 px-5 font-normal">Phone</th>
              <th className="text-left p-3 px-5 font-normal">Address</th>
              <th className="text-left p-3 px-5 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map(user => (
              <tr key={user.id} className="border-b">
                <td><input id={`default-checkbox-${user.id}`} type="checkbox" value="" className="ml-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"/></td>
                <td className="flex items-center mt-5">
                                    <img src={user.img} alt="img.jpg" className="w-16 h-16 rounded-full mr-4"/>
                                    <div>
                                        <div className="font-semibold">{user.fullName}</div>
                                        <div className="text-gray-500">{user.email}</div>
                                    </div>
                                </td>
                <td className="p-3 px-5">{user.job}</td>
                <td className="p-3 px-5">{user.role}</td>
                <td className="p-3 px-5">{user.phone}</td>
                <td className="p-3 px-5">{user.address}</td>
                <td>   
                    <button onClick={() => handleDeleteUser(user.id)} className="flex items-center px-4 py-2 bg-white text-red-500 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6 fixed bottom-20 left-0 right-0">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mx-1 w-8 h-8 flex items-center justify-center rounded-full text-black focus:outline-none">
            &lt;
        </button>
        <p className='mt-1 mr-6'>Back</p>
        {[...Array(Math.ceil(users.length / rowsPerPage)).keys()].map((pageNumber) => (
            <button key={pageNumber} onClick={() => paginate(pageNumber + 1)} className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                {pageNumber + 1}
            </button>
        ))}
        <p className='mt-1 ml-6'>Next</p>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(users.length / rowsPerPage)} className="mx-1 w-8 h-8 flex items-center justify-center rounded-full text-black focus:outline-none">
            &gt;
        </button>
        
    </div>
    <div className="flex justify-start items-center absolute bottom-20 left-20">
      <p className="text-sm text-gray-500">
        Page {currentPage}/{Math.ceil(filteredUsers.length / rowsPerPage)} | Showing {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, filteredUsers.length)} of {filteredUsers.length} users
      </p>
    </div>
    </div>
  );
}

export default Page;
