import "./CustomList.css";
import productImg from "../../Assets/Images/product.png"

function CustomList() {
    return(
        <div>
            <ul className="custom_list">
                <li>
                    <input type="checkbox"/>
                </li>
                <li>
                    <img src={productImg} className="product_img"/>
                </li>
                <li>
                    <p>MG234567</p>
                </li>
                <li>
                    <p>Gloss</p>
                </li>
                <li>
                    Title
                </li>
                <li>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                </li>
                <li>
                    <p>18.00</p>
                </li>
                <li>
                    <p>38.00</p>
                </li>
                <li>
                    <p>36</p>
                </li>
                <li>
                    <p>1,800</p>
                </li>
            </ul>
        </div>
    )
}

export default CustomList;