export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404 - Pagina niet gevonden</h1>
      <p className="text-lg mb-8">De pagina Fotografie bestaat niet of is verwijderd.</p>
      <a href="/home" className="text-blue-400 hover:text-blue-200 underline">Terug naar Home</a>
    </div>
  );
}
