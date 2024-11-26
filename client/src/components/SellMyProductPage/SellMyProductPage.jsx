import { Container, Row, Stack } from "react-bootstrap";
import Loading from "../Loading";
import EditModal from "../EditModal/EditModal";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { toast , ToastContainer } from "react-toastify";
import productApi from "../../../api/products";
import Card from "../Card"

const SellMyProductPage = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState("");
  
    useEffect(() => {
      (async () => {
        try {
          const response = await productApi.getProduct();
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      })();
    }, []);
  
    const handelDeleteProduct = async ({ target }) => {
      try {
        setLoading(true);
        await productApi.deleteProduct(target.id);
        const response = await productApi.getProduct();
        setProducts(response.data);
        toast.success("Product Deleted");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    const handelShowEditModal = (data) => {
      setModalShow(true);
      setData(data);
    };
  
    const handelSubmitEditProduct = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        setInput({});
        setModalShow(false);
        await productApi.updateProduct({ ...input, id: data.id });
        const response = await productApi.getProduct();
        setProducts(response.data);
        toast.success("Edit Succsess");
      } catch (error) {
        toast.error("Some think wrong! " + error);
      } finally {
        setLoading(false);
      }
    };
  
    const handelCloseEditModal = () => {
      setModalShow(false);
      setInput({});
    };
  
    return (
    <>
      <Container>
        <Stack>
          <Row gap="1">
            {loading ? (
              <Loading />
            ) : products.length > 0 ? (
              products.map((product) => (
                <Card
                  key={product._id}
                  product={product}
                  currentUser={user._id}
                  handelDeleteProduct={handelDeleteProduct}
                  handelEditProduct={handelShowEditModal}
                  className="p-0 m-2"
                />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </Row>
        </Stack>
      </Container>
      <ToastContainer />
      <EditModal
        data={{ ...data }}
        currentUser={data.user}
        input={input}
        id={data.id}
        onEdit={handelSubmitEditProduct}
        setInput={setInput}
        show={modalShow}
        onHide={handelCloseEditModal}
      />
    </>
  );
};

export default SellMyProductPage;
