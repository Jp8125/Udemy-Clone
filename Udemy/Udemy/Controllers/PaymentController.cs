using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using System.Configuration;
using System.Data;
using Udemy.Dto;
using Udemy.Interfaces;
using Udemy.Models;

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IPayment _payment;

        public PaymentController(IConfiguration configuration,IPayment payment)
        {
            _configuration = configuration;
            _payment = payment;
        }

        [HttpPost]
        [Route("create-order")]
        
        public IActionResult CreateOrder([FromBody] orderDto orderRequest)
        {



            string keyId = _configuration.GetSection("Razorpay:Key").Value;
            string keySecret = _configuration.GetSection("Razorpay:Secret").Value;
            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

            // Create an order
            Dictionary<string, object> options = new Dictionary<string, object>
            {
                { "amount", orderRequest.amount * 100 },
                { "currency", orderRequest.currency },

            };

            Order order = razorpayClient.Order.Create(options);

            // Return the order ID and other details to the client
            return Ok(new { OrderId = order["id"].ToString() });
        }

        [HttpGet]
        [Route("get-payment")]
        
        public IActionResult GetPaymentDetails(string paymentId)
        {
            string keyId = _configuration.GetSection("Razorpay:Key").Value;
            string keySecret = _configuration.GetSection("Razorpay:Secret").Value;
            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
            Razorpay.Api.Payment payment = razorpayClient.Payment.Fetch(paymentId);
            var res = Newtonsoft.Json.JsonConvert.SerializeObject(payment.Attributes);
            var flag = payment.Attributes["status"] == "captured";
            if (flag)
            {
                return Ok(new { res });
            }
            else
            {
                return BadRequest(new
                {
                    message = "payment failed"
                });
            }
        }


        [HttpPost]
        
        public async Task<IActionResult> addPayment(paymentDto payment)
        {
            var data = new Models.Payment() { 
                PurchaseId = payment.PurchaseId, 
                PaymentAmount = payment.PaymentAmount,
                PaymentMode = payment.PaymentMode, 
                PaymentStatus = payment.PaymentStatus,PaymentDateTime=DateTime.Now,
                Uid=payment.Uid
            };
            await _payment.Insert(data);
            var res =
           new
           {
               message = "payment added"
           };
            return Ok(res);
        }
        [HttpGet]
        public async Task<IActionResult> getPayment()
        {
            var payments =await _payment.GetAll();
            var res = from p in payments select new { p.Uid, p.PaymentAmount, p.PaymentMode, p.PaymentStatus, p.PurchaseId };
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getPaymentbyid(int id)
        {
            var payments = await _payment.GetAll();
            var check = payments.Any(obj => obj.Uid == id);
            if (check)
            {
            var res = from p in payments where p.Uid==id select new { p.Uid, p.PaymentAmount, p.PaymentMode, p.PaymentStatus, p.PurchaseId };
            return Ok(res);
            }
            else
            {
                return BadRequest("data not Found");
            }
        }
    }
}
