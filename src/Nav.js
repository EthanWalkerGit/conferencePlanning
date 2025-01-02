export default function Nav() {
  return (
    <div className="h-16 bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="w-full h-full flex items-center justify-between px-4">
        <div className="cursor-pointer text-xl">Technology Conference</div>
        <div className="flex items-center space-x-4">
          <a href="#itinerary" className="text-lg font-medium cursor-pointer no-underline">Itinerary</a>
          <a href="#account" className="text-lg font-medium cursor-pointer no-underline">Account</a>
        </div>
      </div>
    </div>
  )
}