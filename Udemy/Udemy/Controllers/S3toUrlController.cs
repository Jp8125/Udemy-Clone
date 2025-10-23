using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Udemy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class S3toUrlController : ControllerBase
    {
        private IConfiguration _config;

        public S3toUrlController(IConfiguration config)
        {
            _config = config;
        }
        // POST api/<S3toUrlController>
        [HttpPost]
        
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Filetourl(IFormFile file)
        {
            var accesskey = _config.GetSection("aws:accesskey").Value;
            var secretAccesskey = _config.GetSection("aws:secrateAccesskey").Value;
            var bucketname = _config.GetSection("aws:bucketname").Value;
            if (file == null || file.Length < 0)
            {
                return BadRequest("no file specified");
            }
            else
            {
                
                var destkey = $"Images/{file.FileName.ToLower() + DateTime.Now.ToString()}";
                using (var client=new AmazonS3Client(accesskey,secretAccesskey,Amazon.RegionEndpoint.APSouth1))
                {
                    using (var transferUtility=new TransferUtility(client))
                    {
                        var transferUtilityRequest = new TransferUtilityUploadRequest
                        {
                            BucketName = bucketname,
                            Key = destkey,
                            InputStream = file.OpenReadStream()
                        };
                        await transferUtility.UploadAsync(transferUtilityRequest);
                    }

                }
                var region=Amazon.RegionEndpoint.APSouth1;
                var url = $"https://{bucketname}.s3.{region.SystemName}.amazonaws.com/{destkey}";
                return Ok(new
                {
                    url=url,
                    message="file uploaded successfully"
                });
            }
        }
 
    }
}
