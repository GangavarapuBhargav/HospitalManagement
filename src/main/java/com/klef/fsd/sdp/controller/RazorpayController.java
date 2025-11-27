package com.klef.fsd.sdp.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class RazorpayController {

    @PostMapping("/create-order")
    public String createOrder(@RequestParam("amount") int amount) {
        try {
            RazorpayClient razorpay = new RazorpayClient("RAZORPAY_KEY_ID", "RAZORPAY_SECRET_KEY");

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100); // Amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = razorpay.orders.create(orderRequest);
            return order.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Payment Failed\"}";
        }
    }
}