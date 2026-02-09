export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <h1 className="text-3xl font-bold">About me</h1>
      <p className="text-gray-700">
        We are a company dedicated to providing the best solutions for your needs. 
        Our team is passionate about creating modern, scalable, and user-friendly applications.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Innovative technology</li>
        <li>Professional team</li>
        <li>Customer satisfaction</li>
      </ul>

      {/* Flexbox 2 kolommen */}
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mt-8">
        <div className="flex-1 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Column 1</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>
        <div className="flex-1 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Column 2</h2>
          <p className="text-gray-700">
            Sed nisi. Nulla quis sem at nibh elementum imperdiet. 
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.
          </p>
        </div>
      </div>

      {/* Flexbox 2 rijen */}
      <div className="flex flex-col space-y-4 mt-8">
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="font-semibold mb-2">Row 1</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
          </p>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="font-semibold mb-2">Row 2</h2>
          <p className="text-gray-700">
            Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
          </p>
        </div>
      </div>
    </div>
  )
}
