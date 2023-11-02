export default function FaQ() {
  return (
    <>
      <div class="relative w-[400px] overflow-hidden">
        <input type="checkbox" />
        <div class="bg-yellow-500 h-12 w-full pl-5 flex items-center">
          <h1>Why do we need a account?</h1>
        </div>

        <div class="bg-white overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40">
          <p>
            We do this to prevent spam 
          </p>
        </div>

      </div>
    </>
  );
}
