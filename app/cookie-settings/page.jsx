// pages/cookie-settings.js
export default function CookieSettings() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cookie-instellingen</h1>
     
      <div className="space-y-6">

        <p className="mb-6 text-gray-600">
          We gebruiken cookies om je ervaring op onze website te verbeteren, websiteverkeer te analyseren en gepersonaliseerde inhoud aan te bieden. Sommige cookies zijn essentieel om de site te laten werken, terwijl andere helpen om je ervaring te verbeteren.
        </p>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Essentiële cookies</h2>
            <p className="text-gray-600">
              Deze cookies zijn nodig om de website goed te laten functioneren en kunnen niet worden uitgeschakeld. Ze zorgen voor basisfuncties zoals paginanavigatie, beveiliging en toegang tot beveiligde delen van de site.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Prestatie- en analysecookies</h2>
            <p className="text-gray-600">
              Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken, zodat we de prestaties kunnen verbeteren en een betere gebruikerservaring kunnen bieden.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Functionele cookies</h2>
            <p className="text-gray-600">
              Functionele cookies maken extra functies en personalisatie mogelijk, zoals het onthouden van je voorkeuren of inloggegevens.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Advertentie- en targetingcookies</h2>
            <p className="text-gray-600">
              Deze cookies worden gebruikt om relevante advertenties te tonen op basis van je interesses en surfgedrag. Ze kunnen ook het aantal keer beperken dat je een advertentie ziet en helpen bij het meten van de effectiviteit van advertentiecampagnes.
            </p>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Alles accepteren</button>
          <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition">Niet-essentiële weigeren</button>
          <button className="flex-1 bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition">Instellingen aanpassen</button>
        </div>
    </div>

  )
}
