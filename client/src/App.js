import React from "react";
import "./index.css";
import "./responvive.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsScreen from "./screens/ProductsScreen";
import ScrollToTop from "./components/ScrollToTop";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProductListScreen from "./screens/ProductListScreen";
import SearchScreen from "./screens/SearchScreen";
import CategoryScreen from "./screens/CategoryScreen";
import AdminDashboard from "./screens/AdminDashboard";
import ProductList from "./screens/ProductList";
import CreateProduct from "./screens/CreateProduct";
import UserListScreen from "./screens/UserListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import StoreListScreen from "./screens/StoreListScreen";
import CreateStore from "./screens/CreateStore";
import CategoryListScreen from "./screens/CategoryListScreen";
import CreateCategory from "./screens/CreateCategory";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Switch>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/products/:id" component={ProductsScreen} />
          <Route path="/product/:brand" component={ProductListScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/category/:category" component={CategoryScreen} />
          <Route path="/search/:product" component={SearchScreen} />
          <Route path="/register" component={RegistrationScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentMethod} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/ordershisyory" component={OrderHistoryScreen} />
          <Route path="/dashboard/products/create" component={CreateProduct} />
          <Route path="/dashboard/store/create" component={CreateStore} />
          <Route path="/dashboard/category/create" component={CreateCategory} />
          <Route path="/dashboard/products" component={ProductList} />
          <Route path="/dashboard/orders" component={OrderListScreen} />
          <Route path="/dashboard/users" component={UserListScreen} />
          <Route path="/dashboard/stores" component={StoreListScreen} />
          <Route path="/dashboard/category" component={CategoryListScreen} />
          <Route path="/dashboard" component={AdminDashboard} />
          <Route path="/" component={HomeScreen} exact />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
