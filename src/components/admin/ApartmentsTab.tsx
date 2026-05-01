"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2, Loader2, X, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Apartment } from "@/lib/types";
import { useApartmentById } from "@/hooks/useApartmentById";
import { useUpdateApartment } from "@/hooks/useUpdateApartment";

interface ApartmentsTabProps {
  onDelete: (id: string) => Promise<void>;
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
}

export default function ApartmentsTab({
  onDelete,
  apartments = [],
  loading,
  error,
}: ApartmentsTabProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [apartmentToDelete, setApartmentToDelete] = useState<Apartment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [apartmentToEdit, setApartmentToEdit] = useState<string | null>(null);

  // Filter apartments based on search term
  const filteredApartments = apartments.filter(apartment =>
    apartment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.apartmentCategory?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (apartment: Apartment, e: React.MouseEvent) => {
    e.stopPropagation();
    setApartmentToDelete(apartment);
  };

  const handleEditClick = (apartmentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setApartmentToEdit(apartmentId);
  };

  const handleCloseEditModal = () => {
    setApartmentToEdit(null);
  };

  interface EditApartmentModalProps {
    apartmentId: string;
    onClose: () => void;
  }

  function EditApartmentModal({ apartmentId, onClose }: EditApartmentModalProps) {
    const { apartment, loading, error } = useApartmentById(apartmentId);
    const { updateApartment, loading: updating, error: updateError, success } = useUpdateApartment();
    
    const [isEditing, setIsEditing] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      location: "",
      price: "",
      paymentPlan: "",
      apartmentCategoryId: "",
    });

    // Update form data when apartment loads
    React.useEffect(() => {
      if (apartment) {
        setFormData({
          title: apartment.title,
          description: apartment.description,
          location: apartment.location,
          price: apartment.price,
          paymentPlan: apartment.paymentPlan,
          apartmentCategoryId: apartment.apartmentCategory?.id || "",
        });
      }
    }, [apartment]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
      setIsEditing(!isEditing);
      if (isEditing && apartment) {
        // Reset form data when canceling edit
        setFormData({
          title: apartment.title,
          description: apartment.description,
          location: apartment.location,
          price: apartment.price,
          paymentPlan: apartment.paymentPlan,
          apartmentCategoryId: apartment.apartmentCategory?.id || "",
        });
      }
    };

    const handleSave = async () => {
      // Clear previous validation error
      setValidationError(null);
      
      // Validate price is a valid number
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue) || priceValue < 0) {
        setValidationError("Price must be a valid number greater than or equal to 0");
        return;
      }
      
      const updateData = {
        ...formData,
        price: priceValue.toString(), // Send as string representation of number
      };
      
      const result = await updateApartment(apartmentId, updateData);
      if (result) {
        setIsEditing(false);
        // Optionally close modal after successful update
        setTimeout(() => onClose(), 1500);
        window.location.reload()
      }
    };

    return (
      <div 
        className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Apartment Details</h3>
            <div className="flex items-center gap-2">
              {apartment && (
                <button
                  onClick={handleEditToggle}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-sm text-green-700">Apartment updated successfully!</p>
            </div>
          )}

          {/* Update Error */}
          {updateError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-sm text-red-700">{updateError}</p>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-sm text-red-700">{validationError}</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
              <span className="ml-2 text-gray-600">Loading apartment details...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {apartment && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Title</h4>
                  {isEditing ? (
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{apartment.title}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Location</h4>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{apartment.location}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Price</h4>
                  {isEditing ? (
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{apartment.price}</p>
                  )}
                </div>
                {apartment.apartmentCategory?.name !== "For Sale" && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Plan</h4>
                    {isEditing ? (
                      <select
                        name="paymentPlan"
                        value={formData.paymentPlan}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select payment plan</option>
                        <option value="ANNUAL">ANNUAL</option>
                        <option value="MONTHLY">MONTHLY</option>
                      </select>
                    ) : (
                      <p className="text-sm text-gray-600">{apartment.paymentPlan}</p>
                    )}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Category</h4>
                  <p className="text-sm text-gray-600">{apartment.apartmentCategory?.name || "N/A"}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{apartment.description}</p>
                )}
              </div>

              {/* Features */}
              {apartment.features && apartment.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {apartment.features.map((feature) => (
                      <span 
                        key={feature.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {feature.featureName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {apartment.gallery && apartment.gallery.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Gallery Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {apartment.gallery.map((image) => (
                      <div key={image.id} className="relative group">
                        <Image
                          src={image.imageUrl}
                          alt="Apartment image"
                          width={200}
                          height={128}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={updating}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 inline" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isEditing ? 'Cancel' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleConfirmDelete = async () => {
    if (!apartmentToDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(apartmentToDelete.id);
      setApartmentToDelete(null);
    } catch (error) {
      console.error("Error deleting apartment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setApartmentToDelete(null);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        <span className="ml-2 text-gray-600">Loading apartments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
          {error}
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Manage Apartments
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search apartments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 w-full"
            />
          </div>
          <button
            onClick={() => router.push('/create-apartment')}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Add Apartment
          </button>
        </div>
      </div>

      {filteredApartments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {searchTerm ? "No apartments found matching your search." : "No apartments found."}
          </p>
          <button
            onClick={() => router.push('/create-apartment')}
            className="mt-4 text-green-600 hover:text-green-800 font-medium"
          >
            Add your first apartment
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApartments.map((apartment) => (
                <tr key={apartment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {apartment.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {apartment.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {Number(apartment.price).toLocaleString()}
                    </div>
                    {apartment.apartmentCategory?.name !== "For Sale" && (
                      <div className="text-xs text-gray-500">
                        {apartment.paymentPlan}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {apartment.apartmentCategory?.name || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={(e) => handleEditClick(apartment.id, e)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => handleDeleteClick(apartment, e)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete apartment"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {apartmentToDelete && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Delete Apartment</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
                disabled={isDeleting}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the apartment &quot;{apartmentToDelete.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 inline" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Apartment Modal */}
      {apartmentToEdit && (
        <EditApartmentModal 
          apartmentId={apartmentToEdit} 
          onClose={handleCloseEditModal} 
        />
      )}
    </div>
  );
}
