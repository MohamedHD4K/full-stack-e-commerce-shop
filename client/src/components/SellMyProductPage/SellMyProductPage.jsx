import { Container, Row, Stack } from "react-bootstrap";
import Loading from "../Loading";
import EditModal from "../Modals/EditModal";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import productApi from "../../../api/products";
import Card from "../Card";

const SellMyProductPage = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    document.title = "My Sellers";
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handelDeleteProduct = useCallback(
    async ({ target }) => {
      try {
        setLoading(true);
        await productApi.deleteProduct(target.id);
        const response = await productApi.getProduct();
        setProducts(response.data);
        toast.success("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handelShowEditModal = useCallback((data) => {
    setModalShow(true);
    setData(data);
  }, []);

  const handelSubmitEditProduct = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        const updatedData = { ...input, id: data.id, tags: selectedTags };
        setInput({});
        setModalShow(false);
        setSelectedTags([]);

        await productApi.updateProduct(updatedData);
        const response = await productApi.getProduct();
        setProducts(response.data);

        toast.success("Edit successful.");
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Failed to update product.");
      } finally {
        setLoading(false);
      }
    },
    [input, data, selectedTags]
  );

  const handelCloseEditModal = useCallback(() => {
    setModalShow(false);
    setInput({});
  }, []);

  const renderProducts = useMemo(() => {
    if (loading) return <Loading />;
    if (!products.length) return <p>No products available.</p>;

    return products.map((product) => (
      <Card
        key={product._id}
        product={product}
        calledIn="my-sellers"
        currentUser={user._id}
        handelDeleteProduct={handelDeleteProduct}
        handelEditProduct={handelShowEditModal}
        selectedTags={selectedTags}
        className="p-0 m-2"
      />
    ));
  }, [loading, products, user, handelDeleteProduct, handelShowEditModal, selectedTags]);

  return (
    <>
      <Container style={{ minHeight: "79vh" }}>
        <Stack>
          <h2 className="my-3">My Sellers</h2>
          <Row>{renderProducts}</Row>
        </Stack>
      </Container>
      <ToastContainer />
      <EditModal
        data={data}
        currentUser={data?.user}
        input={input}
        id={data?.id}
        onEdit={handelSubmitEditProduct}
        setInput={setInput}
        show={modalShow}
        onHide={handelCloseEditModal}
        setSelectedTags={setSelectedTags}
        selectedTags={selectedTags}
      />
    </>
  );
};

export default SellMyProductPage;
