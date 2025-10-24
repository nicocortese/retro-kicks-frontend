import ProductGridPage from "@/components/ProductGridPage";

const BrandPage = async ({ params }) => {
  const {brand} = await params
  return (
    <ProductGridPage
      filterType="brand" // Le decimos que filtre por 'brand'
      filterValue={brand} // Le pasamos el valor de la URL
      titlePrefix="Marca"
      descriptionText="Explorá todos nuestros modelos de esta marca y encontrá tu par perfecto."
    />
  );
};

export default BrandPage;
