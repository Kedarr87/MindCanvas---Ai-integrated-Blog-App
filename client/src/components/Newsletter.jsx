import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center my-32 px-4 text-center">
      
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">
        Never Miss a Blog!
      </h1>

      <p className="md:text-lg text-gray-500/70 mb-8">
        Subscribe to get the latest blogs and exclusive news.
      </p>


      <form className="flex w-full max-w-2xl">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          className="md:px-12 px-8 bg-primary/80 hover:bg-primary text-white font-medium rounded-r-md transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
