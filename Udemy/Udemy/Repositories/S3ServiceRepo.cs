using Amazon.S3.Transfer;
using Amazon.S3;
using MailKit;
using Udemy.Interfaces;
using static Org.BouncyCastle.Math.EC.ECCurve;
using Microsoft.AspNetCore.Mvc;

namespace Udemy.Repositories
{
    public class S3ServiceRepo:IS3services
    {
        private IConfiguration _config;

        public S3ServiceRepo(IConfiguration config)
        {
            _config = config;
        }

        [DisableRequestSizeLimit, RequestFormLimits(MultipartBodyLengthLimit = int.MaxValue, ValueLengthLimit = int.MaxValue)]
        public async Task<string> fileTourl(IFormFile file,string folderName)
        {
            var bucketname = _config.GetSection("aws:bucketname").Value;
            var accesskey = _config.GetSection("aws:accesskey").Value;
            var secretAccesskey = _config.GetSection("aws:secrateAccesskey").Value;
            var destkey = $"{folderName}/{DateTime.Now.ToString()+file.FileName.ToLower().Replace(" ","")}";
                using (var client = new AmazonS3Client(accesskey,secretAccesskey,Amazon.RegionEndpoint.APSouth1))
                {
                    using (var transferUtility = new TransferUtility(client))
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
                var region = Amazon.RegionEndpoint.APSouth1;
                var url = $"https://{bucketname}.s3.{region.SystemName}.amazonaws.com/{destkey}";
                return url;
            }
        public async Task<string> uploadtoProfile(IFormFile Imagefile)
        {
            var url = await fileTourl(Imagefile, "Profiles");
            return url;
        }
        public async Task<string> UploadtoThumbnail(IFormFile thumbnail)
        {
            var url = await fileTourl(thumbnail, "Images");
            return url;
        }
        public async Task<string> UploadtoCourse(IFormFile media,string courseName)
        {
            var url = await fileTourl(media, $"Courses/{courseName}");
            return url;
           
        }
    }
}
