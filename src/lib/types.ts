export interface ApartmentCategory {
  id: string;
  name: string;
}

export interface ApartmentFeature {
  id: string;
  apartmentId: string;
  featureName: string;
}

export interface ApartmentGallery {
  id: string;
  apartmentId: string;
  imageUrl: string;
}

export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  paymentPlan: string;
  publicIds: string;
  apartmentCategoryId: string;
  apartmentCategory: ApartmentCategory;
  features: ApartmentFeature[];
  gallery: ApartmentGallery[];
}
