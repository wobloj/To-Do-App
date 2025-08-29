export const Footer = () => {
    const getDate = new Date();
  return (
    <div className="text-center">
        <p>All rights reserved &#xA9; {getDate.getFullYear()}</p>
    </div>
  )
}
