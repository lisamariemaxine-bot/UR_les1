// pages/copyright-regulations.js
export default function CopyrightRegulations() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auteursrechtregels</h1>
        
      <p className="mb-6 text-gray-600">
        We respecteren intellectuele eigendomsrechten en verwachten dat onze gebruikers dat ook doen. Deze pagina beschrijft ons auteursrechtbeleid, hoe je met auteursrechtelijk materiaal omgaat en wat je verantwoordelijkheden als gebruiker zijn.
      </p>

      <div className="space-y-6">

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Algemeen beleid</h2>
          <p className="text-gray-600">
            Alle inhoud op deze website, waaronder tekst, afbeeldingen, video’s en software, is beschermd door auteursrecht tenzij anders vermeld. Ongeoorloofd gebruik of verspreiding van auteursrechtelijk beschermd materiaal is strikt verboden.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Eerlijk gebruik en toestemmingen</h2>
          <p className="text-gray-600">
            Bepaalde vormen van gebruik kunnen onder eerlijk gebruik vallen, zoals commentaar, kritiek of educatieve doeleinden. Voor ander gebruik moet je schriftelijke toestemming krijgen van de auteursrechthebbende.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Auteursrechtinbreuk melden</h2>
          <p className="text-gray-600">
            Als je denkt dat jouw werk op deze website in strijd met het auteursrecht is gebruikt, neem dan direct contact met ons op met een gedetailleerde melding. Wij onderzoeken dit en nemen gepaste maatregelen.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Verantwoordelijkheden van gebruikers</h2>
          <p className="text-gray-600">
            Gebruikers mogen geen inhoud uploaden of delen die inbreuk maakt op auteursrechten. Door deze website te gebruiken, ga je akkoord met de auteursrechtwetgeving en respecteer je de intellectuele eigendom van anderen.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Licentie-informatie</h2>
          <p className="text-gray-600">
            Sommige inhoud kan beschikbaar zijn onder licenties die hergebruik, wijziging of verspreiding toestaan. Controleer altijd de licentievoorwaarden voordat je dergelijk materiaal gebruikt.
          </p>
        </div>

      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Bevestigen</button>
        <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition">Meer informatie</button>
      </div>
    </div>

  )
}
