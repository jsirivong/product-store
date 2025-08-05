import { useEffect } from "react";
import useProducts from "../hooks/useProducts.ts"
import ProductCard from "../components/productcard.tsx";
import ProductModal from "../components/productmodal.tsx";
import { PackageIcon, PlusCircleIcon, RefreshCcwIcon } from "lucide-react";

export default function Home(){
    const {products, loading, error, fetchProducts} = useProducts();

    useEffect(()=>{ 
        fetchProducts()
    }, []) // runs when component first renders

    return (
        <main className="mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <button className="btn btn-primary" onClick={() => {
                    const modal = document.getElementById("product-modal") as HTMLDialogElement;

                    if (!modal){
                        return console.log("Modal does not exist.");
                    }

                    modal.showModal();
                }}>
                    <PlusCircleIcon size={5} className="mr-2"/>
                    Add Product
                </button>
                <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
                    <RefreshCcwIcon className="size-5 text-gray-700"/>
                </button>
            </div>

            <ProductModal/>

            {products.length === 0 && !loading && (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                    <div className="bg-base-100 rounded-full p-6">
                        <PackageIcon className="size-12"/>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold text-gray-500">No products found</h3>
                        <p className="text-gray-500 max-w-sm">
                            Create your first product today.
                        </p>
                    </div>
                </div>
            )}
            {error && <div className="alert alert-error mb-8">{error}</div>}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading loading-spinner loading-lg text-gray-700"></div>
                </div>
            ) : (
                // renders products
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            )}
        </main>
    )
}

