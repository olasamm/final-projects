import React, { useEffect, useState } from 'react';
import { Bell } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './Navbars.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbars = () => {
  const [studentName, setStudentName] = useState('');

  // Fetch student name from localStorage
  useEffect(() => {
    const name = localStorage.getItem('studentName');
    setStudentName(name || 'Guest');
  }, []);


  const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const formattedTime = currentDate.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
});



  return (
    <div className="d-flex justify-content-between bg-light shadow-sm">
      <div>
      <div>
        <div className="fw-medium">{formattedDate}</div>
        <div className="text-muted small">{formattedTime}</div>
      </div>
      </div>
      <div className="d-flex align-items-center">
        <Bell className="me-3" size={20} />
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBQYHBAj/xABBEAABAwMBBQUEBggGAwEAAAABAAIDBAUREgYhMUFRBxNhgZEicaGxFCNSYpLRFTJCQ1NygsEkMzRjouFzsvAW/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAfEQEBAAICAwEBAQAAAAAAAAAAAQIRAxITITFRQWH/2gAMAwEAAhEDEQA/AOnNT28FC0KVqwp4TgmgpeKi6SBKo8eJTmjHNVEgTgmBKCgclymEZ5kI0/eKCRCaB4pyAQhN0/eKLDkqZp8SlAwrA5KkRxUoVKmafvFAb94qxKehIBjnlKiKdqlChaU8O8FlUoTgVGHeCcD4IqQFOBTAnFzWNLnOAaOJPAIaPShZer292fpKo07qsyFvF0LC9oPvC9NNtls/UECO5wNJ5SHQfim161oeCVeWCtpahodDUwvB4aZAV6R4b1WdU5KmncjURgFpQOQm6vBOQCEJCcclYbOQE3UeiUE8wpQ5IhCsChCbnwRqPREU7SpAVC0qRpWVTDCJJGQxGWZ7I4273OecAeqYCsdtTsTVXyqNQy8Tac5bDONbGH7oGAPTPijUm0t77RbZRB0Vuaa2bhqHsxjz5+S59e9prrfCRW1BEJ4QxnSz/tWtV2dX6AfVGlqAPsvLPgQqmq2YvtLky2ufA5sAcPgUdcZiqs9NyAU6WGWHdPDLF/5Iy35qNpa79VwPiFHRIw927VGS13Vu4qxpb3dqUg01yqmY/wB0n5qt0noU4AgcD6IfWopNvNoabGqrZOOksYKt6XtQr48fSrdBIOrXlpKwBKQYwfFVOmNdXpO0+3Sf6m31MXixzXfkrem282cnOHVroD0micPllcR1eJ9U/eNxHoozeKPoGkvdqrCBS3OjlJ5Nmbn0zlWHEZG8eHNfNzYpJjpbHq+K0Gy8dTQXy3OimlYPpDQ5rXlrXAnGCAd/Hmm9MZccjuPuQg8SeqFpyLlIkJHVGodQrA4Jc+CaD0KEFC1StKhaVI0rKpgV7KNgcx2RnevAN+5MprtPS94yot0z2ayWSU7g/U3lkHBB8Eguu6b0R3DeQVezaG2ah30slOeYnicweuMfFWFNWUlWA6kqoJwf4Ugd8itej2ZLRRSjEkbHj7wyqqs2RsdZvqLZSuPXuwCtBoPMEeCAMJo7WMNU9mlklB+jtqYD/tzE48nZCqKvsreATR3d/gJ4QfiCF1HCTCdV72OLVfZttBDkwupKkfdkLD6Ef3VLV7J7QUmTNaKnSOLmAPHwJX0HpRp8FNNeV8zTU89OSJ4JYznGHtLf7L20lBLIA6b6tvIcz+S7ftpBE7Z2se5jS7DcEjeDqC5c2MNJPMrNavJt5oYAxuGjS0b8KyscPe32gjbv+va4+Rz/AGVZW18cDmwsDpZ5NzIoxqc4+5bDYCxPZV/pG4VTTVtZ7NIzBEQPNx5n3LOU2z/rf80qRC6OYwCjS3ohCBwwjcmpVRnmlSBQMKmaVhTxnqFI0nmQohhPaUEuoAe1jH3jgLje1tfSs2tr2wd3JHqaRJE/npGR6rsQpoK1rqeqibLC8e0xw3FZ64dmdjqHOko++oXnf9Scs/Cdylm1xrD2++3Cnx9Du1dEOTRMSPQ5HwV7S7dbR07QHzwVIH8em4+bS1TSdnlypHZpZqSrZ0dmJ39wkFqq6PH0ujlgHV0etnqM481ztzxdZ1qxpO0ybeK20McB+1TVG8/0uA+auqXtCscun6QKulJ/jQEgebchUNPHRyMD5aOOZv26cg/BWFHb7JVu0xNic/nGfZf6HepOal4409JtDZq8f4S50sjujZRn0VizLh7Lw4dRvWSdspZZf8yhid7wvLe7HTUFplktZmpJm6dL4JnDGSBwzhdZzfrPjn8Wu3k3cbPvEjmhr5Wtzw8f7LjNZdJal3d29oa3gZnbx5dVYXquu1bAyiu1fNUQRvDg15HtH3gLwQd01wLyGsbwACmXJPpMNLOxULKOEyHL6iTe+V36x8Pd4Lb7GSBtxlicQHPjy3xxxWEfdZAzRS07nY/afuCuuz/vpdozUVc+XNgdpZndvIXLG7ybymsXU/a6hA1cyow/HHn1S68r0vOlQmByUFAHVySe34JcoQZxhUrSoGqeNrnfqtcfcFlTwU8FHcyNY57oyGtBJzxx7lzq/dpjI5HU9nond4zLTNVNLcH+Tj6+iDoVRWiihdUktDY2lxzzAHJV1D2hWGoIElUISTubIC35rktrudx2j2otsFxqRP31QGNZKD3bTy9kYzvxhb2r2SuJLhPZaSqYODqWpAJH8rwP/Yrnydp8dOOY2e2/o71ba0Yp6uGTO/c9WEZB3tOfEFcfOx4B1i23GieeQjJx5xFwU0dt2gt5BobrVsxwDva+BXPz3H7G/DL8rqc9BRVDsz0sTnfa04d+Ib1X1mz1DVN0+1u4axr0+7n8ViINp9sKF31v0OtaOT2lp9QrSn7TYoHBl6s1VTjnLBiRvpuPzW/Jx5/Wbx8mPuLcWi8UO+gru+YP3VRl4PuJ3j1XgvFyqmUE0Fyt00TzjDojrY7Bz5K6tO2Wzt1LW0d2pxK7hFKe6ef6XYyrt8bJWYcA5p5YyCnjxs9VO9n2OKXyBz5RFjLiwP0NHAFeCK1ui/zHrou2dPFFWM7qJkZ7reQOO9ZYWypqQJP1GHmeKx1mPqtzK5fFQKYZww6jyUVbDTUcH0m7OayBu+OMDLnO8Apr/d7ds40wsxPXOH+Xnc3xceSxOmuv9R9KrHubDnGrljo0LWMt+F1HR+y7aCqul7r4QDFQxU47uDVkNOob/eumiVcu7P7lZLPBUUstRT0tS+TLTKdOpmB+0d2c53LoMVSyRgex7XMPBwOQus9OWV3ViJuqe2bovC2TfhTNetMV7Gvyn6l5WvUmpUMjgjZ+qxo8lKB4HySBKG+JRD2gnGM+SwV2/wDyV/uE9HdH09LdWO+sjleGvB/mG48lpNp7ddLjbXQWa6Cgmduc8xai4dM5Bb5Lj137Ltp4y94gpqzLs5if7Tj19rf81K3Guouzl1rv1tulvq+8p4Klkjmu35bnfg+5dPyASPFfNsB2y2VdmI3OixxaQXxny3gr2Sdre1MLGM00Qc3i8xOy73gu+Sz1tXb6Hz4JCGPGl7Q5vMOGVwe29rt/mmbFK23kuIA1xFg9dS6Fatodpqxge+00ha4bniXd8ys2aI01XZqObJa0xn7p3eh3Kmrtm5MZi7iYdHN0lees2l2ioSTPsyJmfapa3UT5OYMeqqz2qUET9Fwtlyo3DiJYgcehWLx41uZ5RW3jZmnw76VQyxnk5gDh8FVUX6VskubFfXxgfuJXHQfDSd3yWuZ2jbNVbcGv7oc++jewfEJstbs1dx9VWUMhJ4skblTx2L5N/WXuG0u0t5ulIx0Ap5I26XyQMD2yeODnHuTtobztDb7bJjuZJHENa+OMiRufDmrGr2eYcuttZpPIZyFWz/p2laY3ySSxHjpdkeh4LNxtu25nNaYuj2WvdbG64voJqgasyPkeMM4b35OTx4BW93dFaqFsYOotG9x4krodiyNj68SNLXuGrLhv4hcgu89TerrJHRQmSFjtIPLI8V3xu3Gq+lmknkfLIcl5z/0ri2VdwppB+jJp4Xg4+qdgD38lYW2wd1FrrXMJHEDc0e88043GGStgt1rbEZZHaRK4Yjj8cc8eC12/E02Ow+0Vyrq+aiuj2ShkQeyRrcEb8b1uo5M4WO2cs9PaRJK2V9RUzD6yZ/PwA5D/AOytHFKRxKItmOUupeCN+eamz4qosAngKMZ6KUKsq68W6qru5dSXKeifCcjuw1wf4OBG9eMDailxh9uuA+8HQu9RkK+wjeN4U01vSjN+qYdQumz1exo4vga2dp8gdXwXgmk2Gu8vcVooGTv/AHNVH3En4XAFawPd03eKjnigqWGOppopmO4tkYHD0KmjbEV/ZFsvXs7ylZJTZ4Ogflv5Klj7KL1ZZO82a2lmgOchj+HoN3wW7Ox9hDi+jonW6Q79VunfTZPiIyAfMJ7bNd6b/QbSVL28o7hBHOPxNDHfFVdsjBXdotn9m42mkvEAONUDtD8deilftfs/WNMW0tnrLa/g41dMTGP6wMLVio2lpsNmt9vrm43upp3RH8LwR/yUct/hYzTdLPXUozg66fvG+rMhZsXsyU2wGy20UJqLHVxH71LKHAe8fmshe+ya70+qShlhqoxwa8aXfkujVNp2PvkxkpZKSCrH7yFwhkb5jDh5FQSUW1dmGu33R1fTAbo6tvff8sh/q5ynuL6rhtda71ZXEVFNWUrW8XMLg0ebdw806hul9kl7uirauTr7WQPeTwXaRtnET3G0Fkczf7T4cSt/CQHD0Kzt8fY31LpbLHJOJG6jS08ekhw45zjHmr3t/h1/FZaa+/OoZ6SqrO/hmYWvY2MeyP5uqhp6qlY80lshbPIwe0GbmR/zFVwgvV/qjSTNdbqFh9uFjSCfeeLvktBZ7PJXD9E7NsEMMZxUVpblrD0H2nfJTrs2y99rJX1Ao2k1Va7hBGPYZ5Dj5rUbFdnldLNHWXQ9wCQ4j9o+HgugbNbGWqwRf4WAPndvfUTe1I8+JWkjja3JA3nwW5GNvPHZqIUwhEWAODgd4VZVWeopiXREzM8BvHktEzUAnhzuiujbKQvXp1HqrmpoIKnLizRJ9ofkvCbTNymZj3KaNveMpw4JAEuR1WmShOTAR1TwR1UUJMJyTdzQN3pwJSZHVLkdUUuSnat3RNCEHmrLfQVrdNZRU84+/GCqt2zFua4uo3VdE7rTVDmgf0nI+CvCm7uqDKXDZm4Ts0tusNUPs11K1x/E0tKzbdmL3b7hDUfoxtVBG7U6OhrGkv8A6ZMY9V07d1QMDgNylkXdYi5Wqv2tuEYFHVWe2xsDah0wa2ec8dLdJOG9XZ9y11tt1Ja6SOloYWxQxjDWtGF6ySTvyk5ppKAMpwagEdU7IVQo3JwykCFQqEmoc0ah1CI84S6W9AhCKUNb0TgAOAQhRQhCEQYHRGB0QhADdwSpEIoIyk0jolQgTS3ompUIFQBnihCFODW9EuAOAQhWIVCEIEwDxCNI6IQiP//Z"
          alt="Profile"
          className="rounded-circle me-2"
          style={{ width: '40px' }}
        />
        <strong>{studentName}</strong>
      </div>
    </div>
  );
};

export default Navbars;












