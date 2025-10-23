namespace Udemy.Interfaces
{
    public interface IS3services
    {
        public Task<string> uploadtoProfile(IFormFile Imagefile);
        public Task<string> fileTourl(IFormFile file, string folderName);
        public Task<string> UploadtoThumbnail(IFormFile thumbnail);
        public Task<string> UploadtoCourse(IFormFile thumbnail,string courseName);
    }
}
