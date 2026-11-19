export type LibraryBook = {
  id: string
  title: string
  author: string
  description: string
  category: string
  coverColor: string
  views: number
  fileUrl?: string
  fileName?: string
  preview: string
}

export const demoBooks: LibraryBook[] = [
  { id: '1', title: 'Nhà giả kim', author: 'Paulo Coelho', description: 'Một câu chuyện về việc lắng nghe trái tim và theo đuổi vận mệnh của riêng mình.', category: 'Văn học', coverColor: '#668a7d', views: 1240, preview: 'Đôi khi, hành trình quan trọng nhất không phải là đi đến đâu, mà là những điều ta học được trên đường đi. Những dấu hiệu nhỏ bé bắt đầu hiện ra khi ta đủ kiên nhẫn để lắng nghe.' },
  { id: '2', title: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', description: 'Khám phá hai hệ thống tư duy đang định hình cách chúng ta đưa ra quyết định.', category: 'Tâm lý', coverColor: '#b48b53', views: 968, preview: 'Khi đứng trước một câu hỏi khó, đôi khi chúng ta vô thức thay thế nó bằng một câu hỏi dễ hơn. Hiểu được điều này là bước đầu để nhìn rõ hơn những quyết định của mình.' },
  { id: '3', title: 'Hiểu về trái tim', author: 'Minh Niệm', description: 'Một khoảng lặng để hiểu những chuyển động tinh tế trong tâm hồn.', category: 'Tâm lý', coverColor: '#647f92', views: 830, preview: 'Ta thường nghĩ bình yên là khi mọi chuyện đều thuận lợi. Nhưng có lẽ bình yên còn là khả năng ngồi yên với chính mình, ngay cả khi ngoài kia vẫn còn nhiều điều chưa trọn vẹn.' },
  { id: '4', title: 'Đi tìm lẽ sống', author: 'Viktor E. Frankl', description: 'Suy ngẫm sâu sắc về ý nghĩa, hy vọng và sức mạnh tinh thần của con người.', category: 'Văn học', coverColor: '#ac7568', views: 742, preview: 'Giữa kích thích và phản ứng luôn có một khoảng trống. Trong khoảng trống ấy là quyền lựa chọn cách ta đáp lại — và trong lựa chọn đó, tự do và sự trưởng thành của ta bắt đầu.' },
  { id: '5', title: 'Khởi nghiệp tinh gọn', author: 'Eric Ries', description: 'Một cách tiếp cận thực tế để thử nghiệm ý tưởng và học hỏi từ khách hàng.', category: 'Kinh doanh', coverColor: '#827596', views: 615, preview: 'Điều quan trọng không phải là chúng ta làm việc chăm chỉ đến đâu, mà là liệu những nỗ lực đó có tạo ra giá trị mà người dùng thực sự cần hay không.' },
  { id: '6', title: 'Sapiens: Lược sử loài người', author: 'Yuval Noah Harari', description: 'Bức tranh rộng lớn về cách con người tạo nên những thế giới chung.', category: 'Khoa học', coverColor: '#9b805c', views: 582, preview: 'Khả năng hợp tác linh hoạt với số lượng lớn người lạ là điều làm nên sức mạnh đặc biệt của loài người. Những câu chuyện chung đã kết nối chúng ta qua nhiều thế hệ.' },
  { id: '7', title: 'Atomic Habits', author: 'James Clear', description: 'Những thay đổi nhỏ mỗi ngày có thể đưa chúng ta đến những kết quả bền vững.', category: 'Tâm lý', coverColor: '#829788', views: 496, preview: 'Mỗi hành động là một lá phiếu cho kiểu người mà bạn muốn trở thành. Bạn không cần hoàn hảo ngay hôm nay; chỉ cần tiếp tục củng cố hướng đi mình đã chọn.' },
  { id: '8', title: 'Từ tốt đến vĩ đại', author: 'Jim Collins', description: 'Tìm hiểu những nguyên tắc giúp một tổ chức phát triển bền vững theo thời gian.', category: 'Kinh doanh', coverColor: '#927548', views: 384, preview: 'Sự chuyển đổi lớn thường không đến từ một khoảnh khắc kỳ diệu. Nó bắt đầu bằng những bước đi nhỏ, nhất quán, được tích lũy qua thời gian.' },
]
