import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import useProducts from "../hooks/useProducts"

export default function ProductModal() {
    const { loading, addProduct, formData, setFormData } = useProducts();

    return (
        <dialog className="modal" id="product-modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>

                <h3 className="font-bold text-xl mb-8">Add New Product</h3>

                <form onSubmit={addProduct} className="space-y-6">
                    <div className="grid gap-6">
                        {/* Product Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Product Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <Package2Icon className="size-5"/>
                                </div>
                                <input type="text" placeholder="Enter product name" className="input input-bordered rounded-2xl w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                        </div>
                        {/* Product Price Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Price</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <DollarSignIcon className="size-5" />
                                </div>
                                <input type="number" min="0" step="0.01" placeholder="0.00" className="input rounded-2xl input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                    value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
                            </div>
                        </div>

                        {/* Product Image Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">Image URL</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                    <ImageIcon className="size-5"/>
                                </div>
                                <input type="text" placeholder="https://example.com/image.png" className="input rounded-2xl input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                    value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Cancel</button>
                        </form>

                        <button type="submit" className="btn btn-primary min-w-[120px]" disabled={!formData.name || !formData.price || !formData.image || loading}>
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    <PlusCircleIcon className="size-5 mr-2"/>
                                    Add
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>
    )
}