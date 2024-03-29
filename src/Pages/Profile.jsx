import React, { useEffect, useState } from 'react'
import { fetchprofileController, updateprofileController } from '../services/profile-controller';
import { baseURL } from '../services/axios-config';
import { useNavigate } from 'react-router-dom';
import { authController } from '../services/auth-controller';

export default function Profile() {

  const navigate = useNavigate();

  const [profileData, setProfile] = useState({
    email: "",
    name: "",
    contact: "",
    address: "",
    village: "",
    city: "",
    state: "",
    profilepic: "",
    proofpic: ""
  });

  const [prev, setPrev] = useState(null);
  const [adhaarprev, setadhaarPrev] = useState(null);


  function doPrev(inpFile) {
    const [file] = inpFile.files;
    if (file) {
      setPrev(URL.createObjectURL(file));
    }
  }

  function doAPrev(inpFile) {
    const [file] = inpFile.files;
    if (file) {
      setadhaarPrev(URL.createObjectURL(file));
    }
  }

  function doupdate(event) {
    const { name, value } = event.target;
    setProfile({ ...profileData, [name]: value });
  }
  function doUpdatePic(event) {
    setProfile({ ...profileData, [event.target.name]: event.target.files[0] });
    doPrev(event.target);
  }
  function doUpdateAPic(event) {
    setProfile({ ...profileData, [event.target.name]: event.target.files[0] });
    doAPrev(event.target);
  }

  //Save Handler
  const saveHandler = async () => {

    console.log(profileData);

    var formdata = new FormData();

    for (var prop in profileData) {
      formdata.append(prop, profileData[prop]);
    }

    console.log(formdata);

    const serverMsg = await updateprofileController(formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (serverMsg.data.success === true) alert("Update Successfullyyyyy");
    else alert(serverMsg.data.message);
  }

  //Fetching the profile
  const dofetch = async () => {

    const serverMsg = await fetchprofileController(profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = serverMsg.data.data;
    console.log(data);

    if (!data.email) return;

    setProfile({ ...data });
    setPrev(`${baseURL}/uploads/profile/${data?.profilepic}`);
    setadhaarPrev(`${baseURL}/uploads/proof/${data?.proofpic}`);
  }


  //Validating the user
  const validateUser = async () => {

    const token = localStorage.getItem('token');

    if (token === null) {
      navigate('/signin');
    }

    const response = await authController();
    // console.log(response);
    setProfile({ ...profileData, ["email"]: response.data.payload.email });
  }

  useEffect(() => {
    validateUser();
  }, []);


  return (
    <div>
      <div className="w-[1100px] h-full mx-auto rounded-[6%]  flex items-center justify-center px-5 py-5">
        <form className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="flex w-full h-full">
            <div className=" w-1/4 bg-richblack-700 py-10 px-10">
              <span className='ms-9 text-white text-[20px]'>Profile Pic</span>
              <div className="flex items-center gap-x-3">

                {
                  prev ? <img src={prev} alt="ppic" className="w-auto h-28 mx-auto" /> : (
                    <svg
                      className="h-28 w-28 ms-6 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                }
              </div>

              {/* <div className="col-span-3 h-48 "> */}
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  type="file"
                  name="profilepic"
                  className="text-sm text-grey-500
                    file:mr-5 file:py-2 file:px-6
                    file:rounded-full file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:cursor-pointer hover:file:bg-amber-50
                    hover:file:text-amber-700 ms-5 mb-2 text-transparent"
                  onChange={doUpdatePic}

                />
                {/* </div> */}
              </div>
              <hr className='my-6' />
              <span className='text-white text-[20px]'>Upload Adhaar card</span>
              <div className="mt-2 flex items-center gap-x-3">

                {
                  adhaarprev ? <img src={adhaarprev} alt="adhaar_pic" className="w-auto h-28 mx-auto" /> : (
                    <svg
                      className="h-28 w-28 ms-6 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                }
              </div>
              {/* <div className="col-span-3 h-48 "> */}
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  type="file"
                  name="proofpic"
                  className="ms-5 text-sm text-grey-500
                    file:mr-5 file:py-2 file:px-6
                    file:rounded-full file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:cursor-pointer hover:file:bg-amber-50
                    hover:file:text-amber-700 text-transparent"
                  onChange={doUpdateAPic}

                />
                {/* </div> */}
              </div>
            </div>

            <div className=" w-3/4 py-10 px-5 md:px-10">
              <div className="text-center mb-5 ">
                <h1 className="font-bold text-3xl text-gray-900">Your Profile</h1>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 h-9 sm:text-sm sm:leading-6"
                    placeholder="Example@gmail.com"
                    onChange={doupdate}
                    onBlur={dofetch}
                    value={profileData.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset h-9 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter Name"
                        value={profileData.name}
                        onChange={doupdate}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Contact
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="contact"
                        id="last-name"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset h-9 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter number"
                        value={profileData.contact}
                        onChange={doupdate}
                      />
                    </div>
                  </div>

                  <div className="col-span-full mt-[-14px]">
                    <label
                      htmlFor="street-address"
                      className="block text-md  font-medium leading-6 text-gray-900"
                    >
                      address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 h-9 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter Address"
                        value={profileData.address}
                        onChange={doupdate}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 mt-[-14px]">
                    <label
                      htmlFor="village"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Village
                    </label>
                    <input
                      type="text"
                      name="village"
                      id="others"
                      value={profileData.village}
                      className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 h-9 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={doupdate}
                    />
                  </div>

                  <div className="sm:col-span-2 mt-[-14px] ">
                    <label
                      htmlFor="city"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">

                      <select required className='block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 h-9 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        autoComplete='address-level2 ' name='city' value={profileData.city} onChange={doupdate}>
                        <option value="Select">Select</option>
                        <option value="Adilabad">Adilabad</option>
                        <option value="Agra">Agra</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Ahmednagar">Ahmednagar</option>
                        <option value="Aizawl">Aizawl</option>
                        <option value="Ajitgarh(Mohali)">Ajitgarh (Mohali)</option>
                        <option value="Ajmer">Ajmer</option>
                        <option value="Akola">Akola</option>
                        <option value="Alappuzha">Alappuzha</option>
                        <option value="Aligarh">Aligarh</option>
                        <option value="Alirajpur">Alirajpur</option>
                        <option value="Allahabad">Allahabad</option>
                        <option value="Almora">Almora</option>
                        <option value="Alwar">Alwar</option>
                        <option value="Ambala">Ambala</option>
                        <option value="AmbedkarNagar">Ambedkar Nagar</option>
                        <option value="Amravati">Amravati</option>
                        <option value="Amrelidistrict">Amreli district</option>
                        <option value="Amritsar">Amritsar</option>
                        <option value="Anand">Anand</option>
                        <option value="Anantapur">Anantapur</option>
                        <option value="Anantnag">Anantnag</option>
                        <option value="Angul">Angul</option>
                        <option value="Anjaw">Anjaw</option>
                        <option value="Anuppur">Anuppur</option>
                        <option value="Araria">Araria</option>
                        <option value="Ariyalur">Ariyalur</option>
                        <option value="Arwal">Arwal</option>
                        <option value="AshokNagar">Ashok Nagar</option>
                        <option value="Auraiya">Auraiya</option>
                        <option value="Aurangabad">Aurangabad</option>
                        <option value="Aurangabad">Aurangabad</option>
                        <option value="Azamgarh">Azamgarh</option>
                        <option value="Badgam">Badgam</option>
                        <option value="Bagalkot">Bagalkot</option>
                        <option value="Bageshwar">Bageshwar</option>
                        <option value="Bagpat">Bagpat</option>
                        <option value="Bahraich">Bahraich</option>
                        <option value="Baksa">Baksa</option>
                        <option value="Balaghat">Balaghat</option>
                        <option value="Balangir">Balangir</option>
                        <option value="Balasore">Balasore</option>
                        <option value="Ballia">Ballia</option>
                        <option value="Balrampur">Balrampur</option>
                        <option value="Banaskantha">Banaskantha</option>
                        <option value="Banda">Banda</option>
                        <option value="Bandipora">Bandipora</option>
                        <option value="BangaloreRural">Bangalore Rural</option>
                        <option value="BangaloreUrban">Bangalore Urban</option>
                        <option value="Banka">Banka</option>
                        <option value="Bankura">Bankura</option>
                        <option value="Banswara">Banswara</option>
                        <option value="Barabanki">Barabanki</option>
                        <option value="Baramulla">Baramulla</option>
                        <option value="Baran">Baran</option>
                        <option value="Bardhaman">Bardhaman</option>
                        <option value="Bareilly">Bareilly</option>
                        <option value="Bargarh(Baragarh)">Bargarh (Baragarh)</option>
                        <option value="Barmer">Barmer</option>
                        <option value="Barnala">Barnala</option>
                        <option value="Barpeta">Barpeta</option>
                        <option value="Barwani">Barwani</option>
                        <option value="Bastar">Bastar</option>
                        <option value="Basti">Basti</option>
                        <option value="Bathinda">Bathinda</option>
                        <option value="Beed">Beed</option>
                        <option value="Begusarai">Begusarai</option>
                        <option value="Belgaum">Belgaum</option>
                        <option value="Bellary">Bellary</option>
                        <option value="Betul">Betul</option>
                        <option value="Bhadrak">Bhadrak</option>
                        <option value="Bhagalpur">Bhagalpur</option>
                        <option value="Bhandara">Bhandara</option>
                        <option value="Bharatpur">Bharatpur</option>
                        <option value="Bharuch">Bharuch</option>
                        <option value="Bhavnagar">Bhavnagar</option>
                        <option value="Bhilwara">Bhilwara</option>
                        <option value="Bhind">Bhind</option>
                        <option value="Bhiwani">Bhiwani</option>
                        <option value="Bhojpur">Bhojpur</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Bidar">Bidar</option>
                        <option value="Bijapur">Bijapur</option>
                        <option value="Bijapur">Bijapur</option>
                        <option value="Bijnor">Bijnor</option>
                        <option value="Bikaner">Bikaner</option>
                        <option value="Bilaspur">Bilaspur</option>
                        <option value="Bilaspur">Bilaspur</option>
                        <option value="Birbhum">Birbhum</option>
                        <option value="Bishnupur">Bishnupur</option>
                        <option value="Bokaro">Bokaro</option>
                        <option value="Bongaigaon">Bongaigaon</option>
                        <option value="Boudh">Boudh</option>
                        <option value="Budaun">Budaun</option>
                        <option value="Bulandshahr">Bulandshahr</option>
                        <option value="Buldhana">Buldhana</option>
                        <option value="Bundi">Bundi</option>
                        <option value="Burhanpur">Burhanpur</option>
                        <option value="Buxar">Buxar</option>
                        <option value="Cachar">Cachar</option>
                        <option value="CentralDelhi">Central Delhi</option>
                        <option value="Chamarajnagar">Chamarajnagar</option>
                        <option value="Chamba">Chamba</option>
                        <option value="Chamoli">Chamoli</option>
                        <option value="Champawat">Champawat</option>
                        <option value="Champhai">Champhai</option>
                        <option value="Chandauli">Chandauli</option>
                        <option value="Chandel">Chandel</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chandrapur">Chandrapur</option>
                        <option value="Changlang">Changlang</option>
                        <option value="Chatra">Chatra</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Chhatarpur">Chhatarpur</option>
                        <option value="Chhindwara">Chhindwara</option>
                        <option value="Chikkaballapur">Chikkaballapur</option>
                        <option value="Chikkamagaluru">Chikkamagaluru</option>
                        <option value="Chirang">Chirang</option>
                        <option value="Chitradurga">Chitradurga</option>
                        <option value="Chitrakoot">Chitrakoot</option>
                        <option value="Chittoor">Chittoor</option>
                        <option value="Chittorgarh">Chittorgarh</option>
                        <option value="Churu">Churu</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="CoochBehar">Cooch Behar</option>
                        <option value="Cuddalore">Cuddalore</option>
                        <option value="Cuttack">Cuttack</option>
                        <option value="DadraandNagarHaveli">Dadra and Nagar Haveli</option>
                        <option value="Dahod">Dahod</option>
                        <option value="DakshinDinajpur">Dakshin Dinajpur</option>
                        <option value="DakshinaKannada">Dakshina Kannada</option>
                        <option value="Daman">Daman</option>
                        <option value="Damoh">Damoh</option>
                        <option value="Dantewada">Dantewada</option>
                        <option value="Darbhanga">Darbhanga</option>
                        <option value="Darjeeling">Darjeeling</option>
                        <option value="Darrang">Darrang</option>
                        <option value="Datia">Datia</option>
                        <option value="Dausa">Dausa</option>
                        <option value="Davanagere">Davanagere</option>
                        <option value="Debagarh(Deogarh)">Debagarh (Deogarh)</option>
                        <option value="Dehradun">Dehradun</option>
                        <option value="Deoghar">Deoghar</option>
                        <option value="Deoria">Deoria</option>
                        <option value="Dewas">Dewas</option>
                        <option value="Dhalai">Dhalai</option>
                        <option value="Dhamtari">Dhamtari</option>
                        <option value="Dhanbad">Dhanbad</option>
                        <option value="Dhar">Dhar</option>
                        <option value="Dharmapuri">Dharmapuri</option>
                        <option value="Dharwad">Dharwad</option>
                        <option value="Dhemaji">Dhemaji</option>
                        <option value="Dhenkanal">Dhenkanal</option>
                        <option value="Dholpur">Dholpur</option>
                        <option value="Dhubri">Dhubri</option>
                        <option value="Dhule">Dhule</option>
                        <option value="DibangValley">Dibang Valley</option>
                        <option value="Dibrugarh">Dibrugarh</option>
                        <option value="DimaHasao">Dima Hasao</option>
                        <option value="Dimapur">Dimapur</option>
                        <option value="Dindigul">Dindigul</option>
                        <option value="Dindori">Dindori</option>
                        <option value="Diu">Diu</option>
                        <option value="Doda">Doda</option>
                        <option value="Dumka">Dumka</option>
                        <option value="Dungapur">Dungapur</option>
                        <option value="Durg">Durg</option>
                        <option value="EastChamparan">East Champaran</option>
                        <option value="EastDelhi">East Delhi</option>
                        <option value="EastGarohills">East Garo Hills</option>
                        <option value="EastKhasiHills">East Khasi Hills</option>
                        <option value="EastSiang">East Siang</option>
                        <option value="EastSikkim">East Sikkim</option>
                        <option value="EastSinghbhum">East Singhbhum</option>
                        <option value="Eluru">Eluru</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Erode">Erode</option>
                        <option value="Etah">Etah</option>
                        <option value="Etawah">Etawah</option>
                        <option value="Faizabad">Faizabad</option>
                        <option value="Faridabad">Faridabad</option>
                        <option value="Faridkot">Faridkot</option>
                        <option value="Farrukhabad">Farrukhabad</option>
                        <option value="Fatehabad">Fatehabad</option>
                        <option value="FatehgarhSahib">Fatehgarh Sahib</option>
                        <option value="Fatehpur">Fatehpur</option>
                        <option value="Fazilka">Fazilka</option>
                        <option value="Firozabad">Firozabad</option>
                        <option value="Firozpur">Firozpur</option>
                        <option value="Gadag">Gadag</option>
                        <option value="Gadchiroli">Gadchiroli</option>
                        <option value="Gajapati">Gajapati</option>
                        <option value="Ganderbal">Ganderbal</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Ganganagar">Ganganagar</option>
                        <option value="Ganjam">Ganjam</option>
                        <option value="Garhwa">Garhwa</option>
                        <option value="GautamBuddhaNagar">Gautam Buddha Nagar</option>
                        <option value="Gaya">Gaya</option>
                        <option value="Ghaziabad">Ghaziabad</option>
                        <option value="Ghazipur">Ghazipur</option>
                        <option value="GirSomnath">Gir Somnath</option>
                        <option value="Giridih">Giridih</option>
                        <option value="Goalpara">Goalpara</option>
                        <option value="Godda">Godda</option>
                        <option value="Golaghat">Golaghat</option>
                        <option value="Gomati">Gomati</option>
                        <option value="Gonda">Gonda</option>
                        <option value="Gondia">Gondia</option>
                        <option value="Gopalganj">Gopalganj</option>
                        <option value="Gorakhpur">Gorakhpur</option>
                        <option value="Gulbarga">Gulbarga</option>
                        <option value="Gumla">Gumla</option>
                        <option value="Guna">Guna</option>
                        <option value="Guntur">Guntur</option>
                        <option value="Gurdaspur">Gurdaspur</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Gwalior">Gwalior</option>
                        <option value="Hailakandi">Hailakandi</option>
                        <option value="Hamirpur(HP)">Hamirpur (HP)</option>
                        <option value="Hamirpur(UP)">Hamirpur (UP)</option>
                        <option value="Hanumangarh">Hanumangarh</option>
                        <option value="Harda">Harda</option>
                        <option value="Hardoi">Hardoi</option>
                        <option value="Haridwar">Haridwar</option>
                        <option value="Hassan">Hassan</option>
                        <option value="Hathras">Hathras</option>
                        <option value="Haveri">Haveri</option>
                        <option value="Hazaribag">Hazaribag</option>
                        <option value="Hingoli">Hingoli</option>
                        <option value="Hisar">Hisar</option>
                        <option value="Hooghly">Hooghly</option>
                        <option value="Hoshangabad">Hoshangabad</option>
                        <option value="Hoshiarpur">Hoshiarpur</option>
                        <option value="Howrah">Howrah</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Idukki">Idukki</option>
                        <option value="ImphalEast">Imphal East</option>
                        <option value="ImphalWest">Imphal West</option>
                        <option value="Indore">Indore</option>
                        <option value="Jabalpur">Jabalpur</option>
                        <option value="Jagatsinghpur">Jagatsinghpur</option>
                        <option value="JaintiaHills">Jaintia Hills</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Jaisalmer">Jaisalmer</option>
                        <option value="Jajpur">Jajpur</option>
                        <option value="Jalandhar">Jalandhar</option>
                        <option value="Jalaun">Jalaun</option>
                        <option value="Jalgaon">Jalgaon</option>
                        <option value="Jalna">Jalna</option>
                        <option value="Jalore">Jalore</option>
                        <option value="Jalpaiguri">Jalpaiguri</option>
                        <option value="Jammu">Jammu</option>
                        <option value="Jamnagar">Jamnagar</option>
                        <option value="Jamtara">Jamtara</option>
                        <option value="Jamui">Jamui</option>
                        <option value="JanjgirChampa">Janjgir-Champa</option>
                        <option value="Jashpur">Jashpur</option>
                        <option value="Jaunpur">Jaunpur</option>
                        <option value="Jehanabad">Jehanabad</option>
                        <option value="Jhabua">Jhabua</option>
                        <option value="Jhajjar">Jhajjar</option>
                        <option value="Jhalawar">Jhalawar</option>
                        <option value="Jhansi">Jhansi</option>
                        <option value="Jharsuguda">Jharsuguda</option>
                        <option value="Jhunjhunu">Jhunjhunu</option>
                        <option value="Jind">Jind</option>
                        <option value="Jodhpur">Jodhpur</option>
                        <option value="Jorhat">Jorhat</option>
                        <option value="Junagadh">Junagadh</option>
                        <option value="JyotibaPhuleNagar">Jyotiba Phule Nagar</option>
                        <option value="Kabirdham(Kawardha)">Kabirdham (Kawardha)</option>
                        <option value="Kachchh">Kachchh</option>
                        <option value="Kaimur(Bhabua)">Kaimur (Bhabua)</option>
                        <option value="Kaithal">Kaithal</option>
                        <option value="Kalahandi">Kalahandi</option>
                        <option value="Kamrup">Kamrup</option>
                        <option value="KamrupMetropolitan">Kamrup Metropolitan</option>
                        <option value="Kanchipuram">Kanchipuram</option>
                        <option value="Kandhamal">Kandhamal</option>
                        <option value="Kangra">Kangra</option>
                        <option value="Kanker">Kanker</option>
                        <option value="Kannauj">Kannauj</option>
                        <option value="Kannur">Kannur</option>
                        <option value="KanpurDehat">Kanpur Dehat</option>
                        <option value="KanpurNagar">Kanpur Nagar</option>
                        <option value="KanshiramNagar(Kasganj)">Kanshiram Nagar (Kasganj)</option>
                        <option value="Kanyakumari">Kanyakumari</option>
                        <option value="Kapurthala">Kapurthala</option>
                        <option value="Karaikal">Karaikal</option>
                        <option value="Karauli">Karauli</option>
                        <option value="KarbiAnglong">Karbi Anglong</option>
                        <option value="Kargil">Kargil</option>
                        <option value="Karimganj">Karimganj</option>
                        <option value="Karimnagar">Karimnagar</option>
                        <option value="Karnal">Karnal</option>
                        <option value="Karur">Karur</option>
                        <option value="Kasaragod">Kasaragod</option>
                        <option value="Kathua">Kathua</option>
                        <option value="Katihar">Katihar</option>
                        <option value="Katni">Katni</option>
                        <option value="Kaushambi">Kaushambi</option>
                        <option value="Kendrapara">Kendrapara</option>
                        <option value="Kendujhar(Keonjhar)">Kendujhar (Keonjhar)</option>
                        <option value="Khagaria">Khagaria</option>
                        <option value="Khammam">Khammam</option>
                        <option value="Khandwa(EastNimar)">Khandwa (East Nimar)</option>
                        <option value="Khargone(WestNimar)">Khargone (West Nimar)</option>
                        <option value="Kheda(Nadiad)">Kheda (Nadiad)</option>
                        <option value="Khordha">Khordha</option>
                        <option value="Khowai">Khowai</option>
                        <option value="Khunti">Khunti</option>
                        <option value="Kinnaur">Kinnaur</option>
                        <option value="Kishanganj">Kishanganj</option>
                        <option value="Kishtwar">Kishtwar</option>
                        <option value="Kodagu">Kodagu</option>
                        <option value="Koderma">Koderma</option>
                        <option value="Kohima">Kohima</option>
                        <option value="Kokrajhar">Kokrajhar</option>
                        <option value="Kolar">Kolar</option>
                        <option value="Kolasib">Kolasib</option>
                        <option value="Kolhapur">Kolhapur</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Koppal">Koppal</option>
                        <option value="Koraput">Koraput</option>
                        <option value="Korba">Korba</option>
                        <option value="Koriya">Koriya</option>
                        <option value="Kota">Kota</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Krishna">Krishna</option>
                        <option value="Krishnagiri">Krishnagiri</option>
                        <option value="Kulgam">Kulgam</option>
                        <option value="Kullu">Kullu</option>
                        <option value="Kupwara">Kupwara</option>
                        <option value="Kurnool">Kurnool</option>
                        <option value="Kurukshetra">Kurukshetra</option>
                        <option value="KurungKumey">Kurung Kumey</option>
                        <option value="Kushinagar">Kushinagar</option>
                        <option value="Kutch">Kutch</option>
                        <option value="LahaulandSpiti">Lahaul and Spiti</option>
                        <option value="Lakhimpur">Lakhimpur</option>
                        <option value="LakhimpurKheri">Lakhimpur Kheri</option>
                        <option value="Lakhisarai">Lakhisarai</option>
                        <option value="Lalitpur">Lalitpur</option>
                        <option value="Latehar">Latehar</option>
                        <option value="Latur">Latur</option>
                        <option value="Lawngtlai">Lawngtlai</option>
                        <option value="Leh">Leh</option>
                        <option value="Lohardaga">Lohardaga</option>
                        <option value="Lohit">Lohit</option>
                        <option value="LowerDibangValley">Lower Dibang Valley</option>
                        <option value="LowerSubansiri">Lower Subansiri</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Ludhiana">Ludhiana</option>
                        <option value="Lunglei">Lunglei</option>
                        <option value="Madhepura">Madhepura</option>
                        <option value="Madhubani">Madhubani</option>
                        <option value="Madurai">Madurai</option>
                        <option value="MahamayaNagar(Hathras)">Mahamaya Nagar (Hathras)</option>
                        <option value="Maharajganj">Maharajganj</option>
                        <option value="Mahasamund">Mahasamund</option>
                        <option value="Mahbubnagar">Mahbubnagar</option>
                        <option value="Mahe">Mahe</option>
                        <option value="Mahendragarh">Mahendragarh</option>
                        <option value="Mahoba">Mahoba</option>
                        <option value="Mainpuri">Mainpuri</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Maldah">Maldah</option>
                        <option value="Malkangiri">Malkangiri</option>
                        <option value="Mamit">Mamit</option>
                        <option value="Mancherial">Mancherial</option>
                        <option value="Mandi">Mandi</option>
                        <option value="Mandla">Mandla</option>
                        <option value="Mandsaur">Mandsaur</option>
                        <option value="Mandya">Mandya</option>
                        <option value="Mansa">Mansa</option>
                        <option value="Marigaon">Marigaon</option>
                        <option value="Mathura">Mathura</option>
                        <option value="Mau">Mau</option>
                        <option value="Mayurbhanj">Mayurbhanj</option>
                        <option value="Medak">Medak</option>
                        <option value="Meerut">Meerut</option>
                        <option value="Mehsana">Mehsana</option>
                        <option value="Mewat">Mewat</option>
                        <option value="Mirzapur">Mirzapur</option>
                        <option value="Moga">Moga</option>
                        <option value="Mokokchung">Mokokchung</option>
                        <option value="Mon">Mon</option>
                        <option value="Moradabad">Moradabad</option>
                        <option value="Morena">Morena</option>
                        <option value="MumbaiCity">Mumbai City</option>
                        <option value="MumbaiSuburban">Mumbai Suburban</option>
                        <option value="Munger">Munger</option>
                        <option value="Murshidabad">Murshidabad</option>
                        <option value="Muzaffarnagar">Muzaffarnagar</option>
                        <option value="Muzaffarpur">Muzaffarpur</option>
                        <option value="Mysore">Mysore</option>
                        <option value="Nabarangpur">Nabarangpur</option>
                        <option value="Nadia">Nadia</option>
                        <option value="Nagaon">Nagaon</option>
                        <option value="Nagapattinam">Nagapattinam</option>
                        <option value="Nagaur">Nagaur</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Nainital">Nainital</option>
                        <option value="Nalanda">Nalanda</option>
                        <option value="Nalbari">Nalbari</option>
                        <option value="Nalgonda">Nalgonda</option>
                        <option value="Namakkal">Namakkal</option>
                        <option value="Nanded">Nanded</option>
                        <option value="Nandurbar">Nandurbar</option>
                        <option value="Narayanpur">Narayanpur</option>
                        <option value="Narmada">Narmada</option>
                        <option value="Narsinghpur">Narsinghpur</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Navsari">Navsari</option>
                        <option value="Nawada">Nawada</option>
                        <option value="Nawanshahr">Nawanshahr</option>
                        <option value="Nayagarh">Nayagarh</option>
                        <option value="Neemuch">Neemuch</option>
                        <option value="Nellore">Nellore</option>
                        <option value="NewDelhi">New Delhi</option>
                        <option value="Nilgiris">Nilgiris</option>
                        <option value="Nizamabad">Nizamabad</option>
                        <option value="North24Parganas">North 24 Parganas</option>
                        <option value="NorthDelhi">North Delhi</option>
                        <option value="NorthEastDelhi">North East Delhi</option>
                        <option value="NorthGoa">North Goa</option>
                        <option value="NorthSikkim">North Sikkim</option>
                        <option value="NorthTripura">North Tripura</option>
                        <option value="NorthWestDelhi">North West Delhi</option>
                        <option value="Nuapada">Nuapada</option>
                        <option value="Ongole">Ongole</option>
                        <option value="Osmanabad">Osmanabad</option>
                        <option value="Pakur">Pakur</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Palamu">Palamu</option>
                        <option value="Pali">Pali</option>
                        <option value="Palwal">Palwal</option>
                        <option value="PanchMahals">Panch Mahals</option>
                        <option value="Panchkula">Panchkula</option>
                        <option value="Panipat">Panipat</option>
                        <option value="Panna">Panna</option>
                        <option value="PapumPare">Papum Pare</option>
                        <option value="Parbhani">Parbhani</option>
                        <option value="PaschimMedinipur">Paschim Medinipur</option>
                        <option value="Patan">Patan</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                        <option value="Pathankot">Pathankot</option>
                        <option value="Patiala">Patiala</option>
                        <option value="Patna">Patna</option>
                        <option value="PauriGarhwal">Pauri Garhwal</option>
                        <option value="Perambalur">Perambalur</option>
                        <option value="Phek">Phek</option>
                        <option value="Pilibhit">Pilibhit</option>
                        <option value="Pithoragarh">Pithoragarh</option>
                        <option value="Pondicherry">Pondicherry</option>
                        <option value="Poonch">Poonch</option>
                        <option value="Porbandar">Porbandar</option>
                        <option value="Pratapgarh(Rajasthan)">Pratapgarh (Rajasthan)</option>
                        <option value="Pratapgarh(UttarPradesh)">Pratapgarh (Uttar Pradesh)</option>
                        <option value="Pudukkottai">Pudukkottai</option>
                        <option value="Pulwama">Pulwama</option>
                        <option value="Pune">Pune</option>
                        <option value="PurbaMedinipur">Purba Medinipur</option>
                        <option value="Puri">Puri</option>
                        <option value="Purnia">Purnia</option>
                        <option value="Purulia">Purulia</option>
                        <option value="Raebareli">Raebareli</option>
                        <option value="Raichur">Raichur</option>
                        <option value="Raigad">Raigad</option>
                        <option value="Raigarh">Raigarh</option>
                        <option value="Raipur">Raipur</option>
                        <option value="Raisen">Raisen</option>
                        <option value="Rajgarh">Rajgarh</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Rajnandgaon">Rajnandgaon</option>
                        <option value="Rajouri">Rajouri</option>
                        <option value="Rajsamand">Rajsamand</option>
                        <option value="RamabaiNagar(KanpurDehat)">Ramabai Nagar (Kanpur Dehat)</option>
                        <option value="Ramanagara">Ramanagara</option>
                        <option value="Ramanathapuram">Ramanathapuram</option>
                        <option value="Ramban">Ramban</option>
                        <option value="Ramgarh">Ramgarh</option>
                        <option value="Rampur">Rampur</option>
                        <option value="Ranchi">Ranchi</option>
                        <option value="Ratlam">Ratlam</option>
                        <option value="Ratnagiri">Ratnagiri</option>
                        <option value="Rayagada">Rayagada</option>
                        <option value="Reasi">Reasi</option>
                        <option value="Rewa">Rewa</option>
                        <option value="Rewari">Rewari</option>
                        <option value="RiBhoi">Ri Bhoi</option>
                        <option value="Rohtak">Rohtak</option>
                        <option value="Rohtas">Rohtas</option>
                        <option value="Rudraprayag">Rudraprayag</option>
                        <option value="Rupnagar">Rupnagar</option>
                        <option value="Sabarkantha">Sabarkantha</option>
                        <option value="Sagar">Sagar</option>
                        <option value="Saharanpur">Saharanpur</option>
                        <option value="Saharsa">Saharsa</option>
                        <option value="Sahibganj">Sahibganj</option>
                        <option value="Saiha">Saiha</option>
                        <option value="Salem">Salem</option>
                        <option value="Samastipur">Samastipur</option>
                        <option value="Samba">Samba</option>
                        <option value="Sambalpur">Sambalpur</option>
                        <option value="Sangli">Sangli</option>
                        <option value="Sangrur">Sangrur</option>
                        <option value="SantKabirNagar">Sant Kabir Nagar</option>
                        <option value="SantRavidasNagar(Bhadohi)">Sant Ravidas Nagar (Bhadohi)</option>
                        <option value="Saran">Saran</option>
                        <option value="Satara">Satara</option>
                        <option value="Satna">Satna</option>
                        <option value="SawaiMadhopur">Sawai Madhopur</option>
                        <option value="Sehore">Sehore</option>
                        <option value="Senapati">Senapati</option>
                        <option value="Seoni">Seoni</option>
                        <option value="SeraikelaKharsawan">Seraikela Kharsawan</option>
                        <option value="Serchhip">Serchhip</option>
                        <option value="Shahdol">Shahdol</option>
                        <option value="Shahjahanpur">Shahjahanpur</option>
                        <option value="Shajapur">Shajapur</option>
                        <option value="Shamli">Shamli</option>
                        <option value="Sheikhpura">Sheikhpura</option>
                        <option value="Sheohar">Sheohar</option>
                        <option value="Sheopur">Sheopur</option>
                        <option value="Shimla">Shimla</option>
                        <option value="Shimoga">Shimoga</option>
                        <option value="Shivpuri">Shivpuri</option>
                        <option value="Shopian">Shopian</option>
                        <option value="Shravasti">Shravasti</option>
                        <option value="Sibsagar">Sibsagar</option>
                        <option value="Siddharthnagar">Siddharthnagar</option>
                        <option value="Sidhi">Sidhi</option>
                        <option value="Sikar">Sikar</option>
                        <option value="Simdega">Simdega</option>
                        <option value="Sindhudurg">Sindhudurg</option>
                        <option value="Singrauli">Singrauli</option>
                        <option value="Sirmaur">Sirmaur</option>
                        <option value="Sirohi">Sirohi</option>
                        <option value="Sirsa">Sirsa</option>
                        <option value="Sitamarhi">Sitamarhi</option>
                        <option value="Sitapur">Sitapur</option>
                        <option value="Sivaganga">Sivaganga</option>
                        <option value="Siwan">Siwan</option>
                        <option value="Solan">Solan</option>
                        <option value="Solapur">Solapur</option>
                        <option value="Sonbhadra">Sonbhadra</option>
                        <option value="Sonipat">Sonipat</option>
                        <option value="Sonitpur">Sonitpur</option>
                        <option value="South24Parganas">South 24 Parganas</option>
                        <option value="SouthDelhi">South Delhi</option>
                        <option value="SouthEastDelhi">South East Delhi</option>
                        <option value="SouthGoa">South Goa</option>
                        <option value="SouthSikkim">South Sikkim</option>
                        <option value="SouthTripura">South Tripura</option>
                        <option value="SouthWestDelhi">South West Delhi</option>
                        <option value="SriMuktsarSahib">Sri Muktsar Sahib</option>
                        <option value="Srikakulam">Srikakulam</option>
                        <option value="Srinagar">Srinagar</option>
                        <option value="Subarnapur(Sonepur)">Subarnapur (Sonepur)</option>
                        <option value="Sultanpur">Sultanpur</option>
                        <option value="Sundergarh">Sundergarh</option>
                        <option value="Supaul">Supaul</option>
                        <option value="Surat">Surat</option>
                        <option value="Surendranagar">Surendranagar</option>
                        <option value="Surguja">Surguja</option>
                        <option value="Tamenglong">Tamenglong</option>
                        <option value="Tapi">Tapi</option>
                        <option value="TarnTaran">Tarn Taran</option>
                        <option value="Tawang">Tawang</option>
                        <option value="TehriGarhwal">Tehri Garhwal</option>
                        <option value="Thane">Thane</option>
                        <option value="Thanjavur">Thanjavur</option>
                        <option value="TheDangs">The Dangs</option>
                        <option value="Theni">Theni</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Thoothukudi">Thoothukudi</option>
                        <option value="Thoubal">Thoubal</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Tikamgarh">Tikamgarh</option>
                        <option value="Tinsukia">Tinsukia</option>
                        <option value="Tirap">Tirap</option>
                        <option value="Tiruchirappalli">Tiruchirappalli</option>
                        <option value="Tirunelveli">Tirunelveli</option>
                        <option value="Tirupur">Tirupur</option>
                        <option value="Tiruvallur">Tiruvallur</option>
                        <option value="Tiruvannamalai">Tiruvannamalai</option>
                        <option value="Tiruvarur">Tiruvarur</option>
                        <option value="Tonk">Tonk</option>
                        <option value="Tuensang">Tuensang</option>
                        <option value="Tumkur">Tumkur</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Udalguri">Udalguri</option>
                        <option value="UdhamSinghNagar">Udham Singh Nagar</option>
                        <option value="Udhampur">Udhampur</option>
                        <option value="Udupi">Udupi</option>
                        <option value="Ujjain">Ujjain</option>
                        <option value="Ukhrul">Ukhrul</option>
                        <option value="Umaria">Umaria</option>
                        <option value="Una">Una</option>
                        <option value="Unnao">Unnao</option>
                        <option value="UpperSiang">Upper Siang</option>
                        <option value="UpperSubansiri">Upper Subansiri</option>
                        <option value="UttarDinajpur">Uttar Dinajpur</option>
                        <option value="UttaraKannada">Uttara Kannada</option>
                        <option value="Uttarkashi">Uttarkashi</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Vaishali">Vaishali</option>
                        <option value="Valsad">Valsad</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Vellore">Vellore</option>
                        <option value="Vidisha">Vidisha</option>
                        <option value="Villupuram">Villupuram</option>
                        <option value="Virudhunagar">Virudhunagar</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                        <option value="Vizianagaram">Vizianagaram</option>
                        <option value="Warangal">Warangal</option>
                        <option value="Wardha">Wardha</option>
                        <option value="Washim">Washim</option>
                        <option value="Wayanad">Wayanad</option>
                        <option value="WestDelhi">West Delhi</option>
                        <option value="WestGarohills">West Garo Hills</option>
                        <option value="WestGodavari">West Godavari</option>
                        <option value="WestKameng">West Kameng</option>
                        <option value="WestKhasiHills">West Khasi Hills</option>
                        <option value="WestSiang">West Siang</option>
                        <option value="WestSikkim">West Sikkim</option>
                        <option value="WestSinghbhum">West Singhbhum</option>
                        <option value="WestTripura">West Tripura</option>
                        <option value="Wokha">Wokha</option>
                        <option value="Yadgir">Yadgir</option>
                        <option value="Yamunanagar">Yamunanagar</option>
                        <option value="Yanam">Yanam</option>
                        <option value="Yavatmal">Yavatmal</option>
                        <option value="Zunheboto">Zunheboto</option>
                        F</select>

                    </div>
                  </div>


                  <div className="col-span-2 mt-[-14px]">

                    <div className="">
                      <label htmlFor="state" className="block font-medium leading-6 text-gray-900">State / Province</label>
                      <div className="mt-2">
                        <select id="state" name="state" autoComplete="state-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={profileData.state} onChange={doupdate}>
                          <option value="">Select</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                      </div>
                    </div>

                  </div>

                </div>
              </div>


              <div className="my-4 flex justify-center gap-x-6">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={saveHandler}
                >
                  Save
                </button>
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
