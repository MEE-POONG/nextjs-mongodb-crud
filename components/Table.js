/* This example requires Tailwind CSS v2.0+ */

export default function Table({ data, getUserDataById, deleteUserById }) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Firstname
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Lastname
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Street
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        City
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Province
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        ZIP
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.firstname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.street}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.city}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.region}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.zip}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a onClick={() => getUserDataById(user._id)} href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                            <a onClick={() => deleteUserById(user._id)} href="#" className="ml-1 text-red-600 hover:text-red-900">
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
