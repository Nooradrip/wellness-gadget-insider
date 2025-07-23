'use client'
import Image from 'next/image'
import Link from 'next/link'

const Cook = () => {
  return (
    <section className='relative' id='cook-section'>
      <div className='container mx-auto lg:max-w-[--breakpoint-xl] md:max-w-[--breakpoint-md] px-4'>
        <div className='absolute right-0 bottom-[-18%] hidden lg:block'>
          <Image
            src='/images/Logo/wellness-gadget-insider-logo.png'
            alt='pet-gadget-logo'
            width={231}
            height={311}
            className='object-contain'
          />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
          <div className='col-span-6 flex justify-start'>
            <Image
              src='/images/wellness18.jpg'
              alt='wellness skincare'
              width={636}
              height={808}
            />
          </div>
          <div className='col-span-6 flex flex-col justify-center'>
            <p className='text-primary text-lg font-normal mb-3 tracking-widest uppercase text-start'>
              explore with us
            </p>
            <h2 className='text-3xl lg:text-5xl font-semibold text-black dark:text-white text-start'>
              Discover the best in wellness devices.
            </h2>
            <p className='text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-6'>
              Explore with Wellness Gadget Insider as we uncover the best in Amazon wellness with skincare devices and home medical equipment. Discover gadgets that make your home wellness routine easy so that you stay at the height of your wellbeing. 
            </p>
            <p className='text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-1'>
              With the best in devices for wellness, we curate products that help reduce pain and stress. Stay updated on trending wellness technology and explore tips for using devices that enhance your wellbeing.
            </p>
            <p className='text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-1'>
              Our passion for excellence and commitment to quality ensure that you'll find the best gadgets for wellness. Search by topic or visit our Health and Wellness Reviews.
            </p>
            <Link 
              href="/blog" 
              className='text-xl font-medium rounded-full text-white py-5 px-6 bg-primary lg:px-10 mr-6 w-fit border border-primary hover:bg-transparent hover:text-primary transition-colors'
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cook